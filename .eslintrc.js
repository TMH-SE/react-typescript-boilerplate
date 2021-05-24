module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'babel',
    'jest',
    '@typescript-eslint',
    'react-hooks',
    'simple-import-sort',
    'import'
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'no-shadow': 0,

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // Side effect imports.
          ['^\\u0000']
        ]
      }
    ],
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',



    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,

    '@typescript-eslint/triple-slash-reference': 0,

    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 2
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
