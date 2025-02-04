import { Grid, GridItem, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';

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
            gridTemplateRows={{ md: '80px 1fr', base: '80px 1fr 84px' }}
            gridTemplateColumns={{ md: '256px 1fr 256px', base: '1fr' }}
            h='100%'
        >
            <GridItem pl='2' bg='lime.50' area={'header'} className={styles.fix}>
                <Text>test</Text>
                Header
            </GridItem>
            <GridItem
                pl='2'
                bg='pink.300'
                area={'nav'}
                className={styles.fixNav}
                display={{ base: 'none', md: 'block' }}
            >
                Nav
            </GridItem>
            <GridItem pl='2' bg='green.300' area={'main'}>
                <Outlet />
            </GridItem>
            <GridItem
                pl='2'
                bg='green.200'
                area={'aside'}
                className={styles.fixAside}
                display={{ base: 'none', md: 'block' }}
            >
                Aside
            </GridItem>
            <GridItem
                pl='2'
                bg='blue.300'
                area={'footer'}
                display={{ md: 'none', base: 'block' }}
                className={styles.fixFooter}
            >
                Footer
            </GridItem>
        </Grid>
    );
};
