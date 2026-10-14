import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import checkFile from 'eslint-plugin-check-file';

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'check-file': checkFile,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // 1. QUY CHUẨN ĐẶT TÊN BIẾN VÀ HÀM: camelCase
      'camelcase': ['error', {
        properties: 'always',
        ignoreDestructuring: false,
        ignoreImports: false,
        allow: ['^[A-Z][A-Z0-9_]*$'], // Cho phép hằng số UPPER_SNAKE_CASE
      }],

      // 2. QUY CHUẨN TÊN COMPONENT REACT: PascalCase
      'react/jsx-pascal-case': ['error', {
        allowAllCaps: false,
      }],

      // 3. QUY CHUẨN ĐẶT TÊN FILE (check-file plugin)
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/components/**/*.{jsx,tsx}': 'PASCAL_CASE',
          'src/pages/**/*.{jsx,tsx}': 'PASCAL_CASE',
          'src/hooks/**/*.{js,ts}': 'CAMEL_CASE',
          'src/utils/**/*.{js,ts}': 'CAMEL_CASE',
          'src/services/**/*.{js,ts}': 'CAMEL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      // Cảnh báo biến không sử dụng
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
