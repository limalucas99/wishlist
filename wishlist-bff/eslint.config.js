module.exports = (async function config() {
  const { default: love } = await import('eslint-config-love')
  
  return [
    {
      ignores: ["dist/**", "node_modules/**", "coverage/**", "commitlint.config.js", "**/*.js"],
    },
    {
      ...love,
      rules: {
        ...love.rules,
        '@typescript-eslint/class-methods-use-this': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off', 
        '@typescript-eslint/method-signature-style': 'off', 
        'promise/avoid-new': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'eslint-comments/require-description': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-unsafe-type-assertion': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/prefer-destructuring': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'n/handle-callback-err': 'off',
      },
      files: ['src/**/*.ts', 'tests/**/*.ts'],
    },
  ]
})()