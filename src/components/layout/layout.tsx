import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { useIsTablet } from '../../hooks/media-query';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectMenu } from '../../redux/features/burger-slice';
import { Aside } from '../aside';
import { FilterDrawer } from '../drawer';
import { Footer } from '../footer';
import { Header } from '../header';
import { SideNav } from '../side-nav';
import styles from './layout.module.css';

export const Layout = () => {
    const isOpen = useAppSelector(selectMenu);
    const isTablet = useIsTablet();

    return (
        <div className={styles.wrapper}>
            <Grid
                templateAreas={{
                    xl: `"header header header"
                  "nav main aside"`,
                    base: `"header"
                  "main"
                  "footer"`,
                }}
                gridTemplateRows={{ md: '80px 1fr', base: '64px 1fr 84px' }}
                gridTemplateColumns={{
                    xl: '256px 1fr 280px',
                    base: '1fr',
                }}
                minHeight='100vh'
            >
                <GridItem
                    bg={isTablet && isOpen ? 'white' : 'lime.50'}
                    area='header'
                    className={styles.header}
                >
                    <Header />
                </GridItem>
                {(isTablet && isOpen) || !isTablet ? (
                    <GridItem
                        area={'nav'}
                        position={{ base: 'absolute', xl: 'sticky' }}
                        className={`${styles.nav} ${isOpen ? styles.open : ''}`}
                    >
                        <SideNav />
                    </GridItem>
                ) : null}
                <GridItem area='main' pt={{ base: 4, md: 8 }} pl={6} pr={6} overflow='hidden'>
                    <Outlet />
                </GridItem>
                <GridItem
                    area='aside'
                    className={styles.aside}
                    display={{ base: 'none', xl: 'block' }}
                >
                    <Aside />
                    <FilterDrawer />
                </GridItem>
                <GridItem
                    bg='lime.50'
                    area='footer'
                    display={{ xl: 'none', base: 'block' }}
                    className={styles.footer}
                >
                    <Footer />
                </GridItem>
            </Grid>
        </div>
    );
};
