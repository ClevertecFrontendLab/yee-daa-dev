export const CardTypeProps = {
    DEFAULT: {
        minHeight: 'none',
        CardHeader: {
            p: 4,
            pb: 2,
        },
        CardBody: {
            p: 4,
            pt: 2,
        },
    },
    PROFILE: {
        minHeight: 'none',
        CardHeader: {
            p: 5,
            pb: 2,
            pl: 6,
        },
        CardBody: {
            p: 6,
            pt: 5,
            pb: 0,
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
    },
};
