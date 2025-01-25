import { ESLint } from 'eslint';

const eslint = new ESLint({
  baseConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Add any custom rules here
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn', // Example rule
      },
    },
    {
      files: ['*.jsx', '*.js'],
      rules: {
        'react/prop-types': 'off', // Example rule
      },
    },
  ],
});

export default eslint;
