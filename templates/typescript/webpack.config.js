const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = process.env.NODE_ENV || 'development';

const isDev = process.env.NODE_ENV !== 'production';
const devtool = isDev ? 'source-map' : undefined;
const target = isDev ? 'web' : 'browserslist';

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
];

if (isDev) {
  plugins.push(new ReactRefreshWebpackPlugin());
} else {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
  );
}

module.exports = {
  mode,
  target,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
                exportOnlyLocals: false,
              },
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins,
  devtool,
  devServer: {
    open: true,
    hot: true,
  },
};
