require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier' // eslint-config-prettier 的缩写
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue', // eslint-plugin-vue
    'prettier' // eslint-plugin-prettier的缩写
  ],
  rules: {
    'space-before-function-paren': 0,
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 'error'
  }
}
