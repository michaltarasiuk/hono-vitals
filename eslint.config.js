import js from '@eslint/js'
import {defineConfig} from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      '.agents/**',
      'data/**',
      'dist/**',
      'node_modules/**',
      'public/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w.*\\u0000$'],
            ['^@?\\w'],
            ['^@/.*\\u0000$'],
            ['^@/'],
            ['^\\..*\\u0000$'],
            ['^\\.'],
            ['^'],
          ],
        },
      ],
    },
  },
  {
    files: ['app/islands/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['useId'],
              message:
                'Honox SSR and island hydration disagree on useId(). ' +
                'Use islandId() from @/lib/island-id instead.',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.name='useId'], CallExpression[callee.property.name='useId']",
          message:
            'Honox SSR and island hydration disagree on useId(). ' +
            'Use islandId() from @/lib/island-id instead.',
        },
      ],
    },
  },
)
