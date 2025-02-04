import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Aside } from '../aside';
import { Footer } from '../footer';
import { Header } from '../header';
import styles from './layout.module.css';

export const Layout = () => {
    return (
        <Grid
            templateAreas={{
                md: `"header header header"
                  "nav main aside"`,
                base: `"header"
                  "main"
                  "footer"`,
            }}
            gridTemplateRows={{ md: '80px 1fr', base: '64px 1fr 84px' }}
            gridTemplateColumns={{ md: '256px 1fr 256px', base: '1fr' }}
        >
            <GridItem bg='lime.50' area={'header'} className={styles.fix}>
                <Header />
            </GridItem>
            <GridItem
                bg='pink.300'
                area={'nav'}
                className={styles.fixNav}
                display={{ base: 'none', md: 'block' }}
            >
                Nav
            </GridItem>
            <GridItem bg='green.300' area={'main'}>
                <Outlet />
            </GridItem>
            <GridItem
                area='aside'
                className={styles.fixAside}
                display={{ base: 'none', md: 'block' }}
            >
                <Aside />
            </GridItem>
            <GridItem
                bg='lime.50'
                area={'footer'}
                display={{ md: 'none', base: 'block' }}
                className={styles.fixFooter}
            >
                <Footer />
            </GridItem>
        </Grid>
    );
};
