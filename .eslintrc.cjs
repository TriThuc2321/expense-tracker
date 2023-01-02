module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        'react/prop-types': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'no-restricted-exports': 0,
        'react/react-in-jsx-scope': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'max-len': 0,
        'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'no-plusplus': 0,
        'react/jsx-wrap-multilines': 0,
        'no-console': 0,
        'linebreak-style': 0,
        'object-curly-newline': 0,
        'import/no-cycle': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'import/prefer-default-export': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'operator-linebreak': 0,
        'react/no-array-index-key': 0,
        'implicit-arrow-linebreak': 0,
        'eslint-disable-next-line': 0,
        '@typescript-eslint/no-explicit-any': 0,
    },
};
