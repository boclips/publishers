const postcssPresetEnv = require('postcss-preset-env');
const tailwind = require('@tailwindcss/jit');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwind, autoprefixer, postcssPresetEnv({ stage: 0 })],
};
