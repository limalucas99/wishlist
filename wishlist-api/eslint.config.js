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
      },
      files: ['src/**/*.ts', 'tests/**/*.ts'],
    },
  ]
})()