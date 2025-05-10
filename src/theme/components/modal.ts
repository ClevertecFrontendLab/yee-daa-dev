import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const authVariant = definePartsStyle({
    dialog: {
        p: 8,
        maxW: { base: '316px', md: '396px' },
        borderRadius: 16,
    },
    header: {
        p: 0,
    },
    body: {
        p: 0,
    },
    footer: {
        p: 0,
    },
});

const variants = {
    auth: authVariant,
};

export const modalTheme = defineMultiStyleConfig({
    variants,
});
