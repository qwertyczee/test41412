module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Use recommended TypeScript rules
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. Displays prettier errors as ESLint errors. Must be last in the extends array.
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    'prettier/prettier': 'warn', // Show prettier errors as warnings
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
    'react/prop-types': 'off', // Disable prop-types as we might use TypeScript or other solutions
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow implicit return types for functions
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused vars, allow underscore prefix
    // Add other custom rules here
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.js',
    'tailwind.config.js',
    'postcss.config.js',
  ], // Ignore build output and config files
};
