const postcssPresetEnv = require('postcss-preset-env');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    tailwind,
    postcssImport,
    autoprefixer,
    postcssPresetEnv({ stage: 0 }),
  ],
};
