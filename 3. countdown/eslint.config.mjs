import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    {
        rules: {
            'prefer-const': 'warn',
            'no-var': 'error',
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'no-multi-spaces': ['error'],
            camelcase: ['error', { ignoreDestructuring: true }],
            'no-console': ['error', { allow: ['warn', 'error'] }],
        },
    },
];
