module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-empty-function': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
  },
};
