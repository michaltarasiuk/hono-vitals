import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import {defineConfig} from 'eslint/config'
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
          fixStyle: 'inline-type-imports',
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
      perfectionist,
    },
    rules: {
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-named-exports': [
        'error',
        {groups: ['value-export', 'type-export']},
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {groups: ['value-import', 'type-import']},
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'side-effect',
            'value-builtin',
            'value-external',
            'value-internal',
            ['value-parent', 'value-sibling', 'value-index'],
          ],
        },
      ],
    },
  },
  {
    files: ['app/**/$*.{ts,tsx}'],
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
