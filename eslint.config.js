module.exports = (async function config() {
  const { default: love } = await import('eslint-config-love')
  
  return [
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
      },
      files: ['src/**/*.js', 'src/**/*.ts', 'tests/**/*.js', 'tests/**/*.ts'],
      ignores: ["dist/**", "node_modules/**", "coverage/**", "commitlint.config.js"],
    },
  ]
})()