module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    camelcase: [0],
    'max-len': ['error', { code: 125, tabWidth: 2 }],
    'dot-notation': ['error', { allowPattern: '^[a-z]*(_[a-z]+)+$' }],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
  },
};
