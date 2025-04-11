export const USER_INFO_TYPES = {
    DEFAULT: {
        Avatar: {
            size: 'md',
        },
        userName: {
            fontSize: 'lg',
            lineHeight: { base: 6, md: 7 },
        },
        login: {
            fontSize: 'sm',
        },
    },
    SHRUNK: {
        Avatar: {
            size: { base: 'sm', xmd: 'md' },
        },
        userName: {
            fontSize: { base: 'md', xmd: 'lg' },
            lineHeight: { base: 6, xmd: 7 },
        },
        login: {
            fontSize: { base: 'xs', xmd: 'sm' },
        },
    },
};
