import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const black = defineStyle({
    bgColor: 'black',
    color: 'white',
    _hover: {
        bgColor: 'blackAlpha.800',
        _disabled: {
            opacity: 0.8,
            bgColor: 'blackAlpha.800',
        },
    },
    _disabled: {
        opacity: 0.8,
        bgColor: 'blackAlpha.800',
    },
});

export const buttonTheme = defineStyleConfig({
    variants: { black },
});
