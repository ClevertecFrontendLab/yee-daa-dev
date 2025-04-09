import { extendTheme } from '@chakra-ui/react';

import { buttonTheme } from './components/button';
import { inputTheme } from './components/input';
import { modalTheme } from './components/modal';
import { tabsTheme } from './components/tabs';

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                color: 'black',
            },
        },
    },
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            600: '#2DB100',
            700: '#207E00',
            800: '#134B00',
        },
        blackAlpha: {
            50: '#0000000A',
        },
    },
    fonts: {
        body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
        heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
        mono: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    },
    breakpoints: {
        xs: '360px',
        sm: '560px',
        md: '768px',
        xmd: '896px',
        lg: '992px',
        xl: '1120px',
        xxl: '1280px',
        xxxl: '1320px',
        '2xl': '1536px',
        '3xl': '1744px',
    },
    components: {
        Tabs: tabsTheme,
        Input: inputTheme,
        Button: buttonTheme,
        Modal: modalTheme,
        FormLabel: {
            baseStyle: {
                fontWeight: 'normal',
            },
        },
    },
});
