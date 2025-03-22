import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  vue: false,
  // 忽略文件
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/test/**',
  ],
  // 自定义规则
  rules: {
    'no-console': 'warn',
    'style/brace-style': 'off',
    // 'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'ts/consistent-type-imports': 'off',
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
  },
});
