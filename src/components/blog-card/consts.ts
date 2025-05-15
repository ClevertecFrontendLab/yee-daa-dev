export const CardTypeProps = {
    DEFAULT: {
        minHeight: 184,
        CardHeader: {
            p: 4,
            pb: 2,
        },
        CardBody: {
            p: 4,
            pt: 2,
        },
        CardFooter: {},
        HStack: {
            justifyContent: 'auto',
        },
    },
    PROFILE: {
        minHeight: 0,
        CardHeader: {
            p: { base: 2, xmd: 5 },
            pb: 2,
            pl: { base: 2, xmd: 6 },
        },
        CardBody: {
            p: { base: 2, xmd: 6 },
            pt: { base: 2, xmd: 5 },
            pb: 0,
        },
        CardFooter: {
            flexDirection: { base: 'column-reverse' as const, '2xl': 'row' as const },
            gap: { base: 5, '2xl': 0 },
            pl: { base: 2, xmd: 7 },
            pr: { base: 2, xmd: 6 },
            pb: { base: 2, xmd: 4 },
        },
        HStack: {
            justifyContent: { base: 'flex-end', '2xl': 'auto' },
        },
    },
    FAVORITE: {
        minHeight: { base: 208, xl: 224 },
        CardHeader: {
            p: 6,
            pb: 4,
            pl: {
                base: 4,
                xl: 6,
            },
        },
        CardBody: {
            p: 6,
            pt: { base: 0, xl: 3 },
            pl: {
                base: 4,
                xl: 6,
            },
            pb: {
                base: 1,
                '2xl': 6,
            },
            flex: {
                base: '0 1 0%',
                '2xl': '1 1 0%',
            },
        },
        CardFooter: {},
        HStack: {
            justifyContent: 'auto',
        },
    },
    AVAILABLE: {
        minHeight: { base: 200, xl: 224 },
        CardHeader: {
            p: { base: 4, xl: 6 },
            pb: 4,
        },
        CardBody: {
            p: { base: 4, xl: 6 },
            pt: { base: 0, xl: 3 },
            pb: 0,
            flex: {
                base: '0 1 0%',
                '2xl': '1 1 0%',
            },
        },
        CardFooter: {},
        HStack: {
            justifyContent: 'auto',
        },
    },
};
