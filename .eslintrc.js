'use strict';

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:eslint-plugin/recommended',
        'plugin:node/recommended',
    ],
    env: {
        node: true,
    },
    overrides: [
        {
            files: ['tests/**/*.js'],
            env: { mocha: true },
        },
    ],
    rules: {
        'quotes': ['error', 'single'],
        'indent': [2, 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'no-unused-vars': 'warn',
        'eslint-plugin/require-meta-type': 'warn',
        'prefer-message-ids': 'warn',
        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        'object-curly-spacing': ['warn', 'always'],
        'react/jsx-curly-spacing': ['warn', { 'when': 'always', children: true }],
        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'semi',
                'requireLast': true
            },
            'singleline': {
                'delimiter': 'semi',
                'requireLast': false
            },
            'multilineDetection': 'brackets'
        }],
    }
};
