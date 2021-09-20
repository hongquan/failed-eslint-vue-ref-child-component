module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'jest',
  ],
  // Ref: https://eslint.vuejs.org/user-guide/#usage
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  extends: [
    // Vue3 has different guide on <template :key>
    'plugin:vue/vue3-essential',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    // Without this, eslint misjudge our store mutation definitions
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // We follows braces style in Vue & TypeScript documentation
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    // Prevent creating change in Git diff
    'comma-dangle': ['error', 'always-multiline'],
    // Allow to skip "await" in front of "router.push".
    '@typescript-eslint/no-floating-promises': ['error', {
      ignoreVoid: true
    }],
    // Our API response follows Python style, camelCase cannot be guaranteed
    'camelcase': 'off',
    'no-void': ['error', { allowAsStatement: true }],
  },
  ignorePatterns: [
    // Config files, don't pass them to @typescript-eslint
    '*.js',
  ]
}
