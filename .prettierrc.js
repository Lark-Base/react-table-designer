module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',
  jsxBracketSameLine: false,
  endOfLine: 'lf',
  tailwindConfig: './tailwind.config.js',
  // 对非标准属性进行排序
  tailwindAttributes: ['wrapperClassName', 'wrapClassName', 'rootClassName'],
  // 对函数调用中的类进行排序
  tailwindFunctions: ['classNames', 'classnames', 'twMerge'],
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
}
