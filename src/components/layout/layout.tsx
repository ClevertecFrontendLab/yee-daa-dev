import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Aside } from '../aside';
import { Footer } from '../footer';
import { Header } from '../header';
import { SideNav } from '../side-nav';
import styles from './layout.module.css';

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Grid
                templateAreas={{
                    md: `"header header header"
                  "nav main aside"`,
                    base: `"header"
                  "main"
                  "footer"`,
                }}
                gridTemplateRows={{ md: '80px 1fr', base: '64px 1fr 84px' }}
                gridTemplateColumns={{
                    md: 'clamp(170px, 13vw, 266px) 1fr clamp(160px, 13vw, 256px)',
                    base: '1fr',
                }}
            >
                <GridItem bg='lime.50' area='header' className={styles.header}>
                    <Header />
                </GridItem>
                <GridItem
                    area={'nav'}
                    className={styles.nav}
                    display={{ base: 'none', md: 'block' }}
                >
                    <SideNav />
                </GridItem>
                <GridItem area='main' pt={{ base: 4, md: 8 }} pl={6} pr={6} overflow='hidden'>
                    <Outlet />
                </GridItem>
                <GridItem
                    area='aside'
                    className={styles.aside}
                    display={{ base: 'none', md: 'block' }}
                >
                    <Aside />
                </GridItem>
                <GridItem
                    bg='lime.50'
                    area='footer'
                    display={{ md: 'none', base: 'block' }}
                    className={styles.footer}
                >
                    <Footer />
                </GridItem>
            </Grid>
        </div>
    );
};
