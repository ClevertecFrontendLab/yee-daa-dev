import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys,
);

const authVariant = definePartsStyle(() => ({
    root: {
        borderColor: 'blackAlpha.200',
        borderBottomWidth: '2px',
    },
    tab: {
        color: 'lime.800',
        _selected: {
            color: 'lime.700',
            bg: 'transparent',
        },
    },
    tablist: {
        borderColor: 'blackAlpha.200',
    },
    indicator: {
        mt: '-1.5px',
        height: '2px',
        bg: 'lime.700',
        borderRadius: '1px',
    },
}));

const variants = {
    auth: authVariant,
};

export const tabsTheme = defineMultiStyleConfig({ variants });
