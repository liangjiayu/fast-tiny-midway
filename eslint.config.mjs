import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  vue: false,
  javascript: false,
  // 忽略文件
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/test/**',
    // ...globs
  ],
  // 自定义规则
  rules: {
    'style/brace-style': 'off',
  },
});
