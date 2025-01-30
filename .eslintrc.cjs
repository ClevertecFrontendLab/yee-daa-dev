module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'coverage'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import', 'simple-import-sort'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
            },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};
