module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  globals: {
    graphql: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'backtick'],
    'no-console': 0,
  },
}
