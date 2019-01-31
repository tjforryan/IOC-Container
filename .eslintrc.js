module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': [2, { allow: ['info', 'error'] }],
    'linebreak-style': ['error', 'unix']
  },
  globals: {
    describe: true,
    it: true
  }
};
