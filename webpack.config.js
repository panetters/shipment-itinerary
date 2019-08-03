const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const BUILD_DIR = path.join(__dirname, '/client/build');

module.exports = {
  entry: {
    index: path.resolve(SRC_DIR, 'index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        include: SRC_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
};
