const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const browserConfig = {
  name: 'client',
  target: 'web',
  entry: {
    main: path.join(process.cwd(), 'client/index.tsx'),
  },
  output: {
    path: path.join(process.cwd(), 'public/client_dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devtool: isDev ? 'source-map' : false,
  mode: process.env.NODE_ENV || 'development',
  watch: isDev,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.module\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              import: false,
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /client_dist/, /server_dist/],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), 'static'),
          to: path.join(process.cwd(), 'public/client_dist/static'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'SS-test',
      filename: path.join(process.cwd(), 'public/client_dist/main.html'),
      template: path.join(process.cwd(), 'client/main.html'),
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },
};

const serverConfig = {
  name: 'server',
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV === 'development',
  entry: {
    server: path.join(process.cwd(), 'server/server.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), 'public/server_dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /client_dist/, /server_dist/],
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /client/],
        loader: 'babel-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'ignore-loader',
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },
};

module.exports = [browserConfig, serverConfig];
