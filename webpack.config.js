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
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    ],
  },
};
