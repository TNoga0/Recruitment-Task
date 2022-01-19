module.exports = {
  root: true,
  env: { node: true },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: { parser: 'babel-eslint' },
  rules: {
    'no-plusplus': 'off',
    'linebreak-style': ['error', 'unix'],
    'brace-style': [2, 'stroustrup', { "allowSingleLine": true }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'newline-per-chained-call': ['error', { "ignoreChainWithDepth": 1 }],
    'multiline-ternary': ['error', 'always-multiline'],
    'operator-linebreak': ['error', 'after'],
    'import/prefer-default-export': 'off',
    'vue/max-len': ['error', { code: 120, template: 200 }],
    'vue/script-indent': ['warn', 2, { baseIndent: 1 }],
    'vue/html-indent': ['warn', 2, {
      'baseIndent': 1,
      'alignAttributesVertically': true,
    }],
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 2,
      'multiline': {"max": 1, "allowFirstLine": true }
    }],
    camelcase: 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'no-control-regex': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', { code: 200 }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
      vue: 'never',
      json: 'never',
    }],
  },
  overrides: [
    {
      files: ['*.vue', '*.js'],
      rules: {
        'max-len': 'off',
        indent: 'off',
        'func-names': ['error', 'as-needed'],
      },
    },
  ],
};
