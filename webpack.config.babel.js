import webpack from 'webpack';

const config = {
  entry: __dirname + '/lib/app.js',

  output: {
    path: __dirname + '/src',
    filename: 'app.js',
  },

  devtool: '#source-map',

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=1&optional=runtime' },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
        semicolons: true,
      },
      sourceMap: true,
    }),
  ],
};

export default config;
