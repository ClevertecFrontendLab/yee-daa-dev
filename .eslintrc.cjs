const { resolve } = require('path');

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'coverage', 'node_modules'],
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'react-refresh', 'import', 'simple-import-sort'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '~/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@public/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
            },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'arrow-body-style': 'error',
        'react/jsx-curly-brace-presence': ['error', 'never'],
    },
};
