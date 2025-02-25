import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const authVariant = definePartsStyle(({ theme }) => ({
    field: {
        bgColor: 'white',
        border: `1px solid ${theme.colors.lime[150]}`,
        color: 'lime.800',
        _focus: {
            borderColor: theme.colors.lime[700],
        },
        _placeholder: {
            color: theme.colors.lime[800],
        },
    },
}));

const variants = {
    auth: authVariant,
};

export const inputTheme = defineMultiStyleConfig({ variants });
