module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Ensures Prettier rules run last
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'postcss.config.js', 'tailwind.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // Specify your TSConfig path
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+ and Vite
    'prettier/prettier': 'warn', // Show Prettier issues as warnings
    '@typescript-eslint/no-unused-vars': 'warn',
    // Add any project-specific overrides here
  },
};
