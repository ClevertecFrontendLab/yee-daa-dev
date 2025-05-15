export const USER_INFO_TYPES = {
    DEFAULT: {
        Avatar: {
            size: 'md',
        },
        userName: {
            fontSize: 'lg',
            lineHeight: { base: 6, md: 7 },
            'data-test-id': 'blogs-card-name',
        },
        login: {
            'data-test-id': 'blogs-card-login',
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
            'data-test-id': 'blogs-card-name',
        },
        login: {
            fontSize: { base: 'xs', xmd: 'sm' },
            'data-test-id': 'blogs-card-login',
        },
    },
};
