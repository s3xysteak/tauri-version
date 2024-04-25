import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
  },
}, {
  ignores: ['test/__e2e__'],
})
