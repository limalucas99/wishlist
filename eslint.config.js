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
      },
      files: ['**/*.js', '**/*.ts'],
      ignores: ["dist/**", "node_modules/**", "coverage/**", "eslint.config.js", "jest.config.ts"],
    },
  ]
})()