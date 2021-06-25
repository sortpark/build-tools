const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = '') => {
  const isDev = env.dev;
  const mode = isDev ? 'development' : 'production';
  const minStr = isDev ? '' : '.min';
  const watch = isDev;
  const useAnalyzer = env.analyze;

  const builds = {
    node: {
      mode,
      entry: './src/index.js',
      target: 'node',
      output: {
        filename: `build-tools.cjs${minStr}.js`,
        libraryTarget: 'commonjs2',
      },
      externals: ['fs', 'path'],
      externalsType: 'commonjs',
      babelOptions: {
        presets: ['@babel/preset-env'],
        targets: { node: 'current' },
      },
      bundleAnalyzer: {
        analyzerMode: useAnalyzer ? 'server' : 'disabled',
      },
    },
  };

  return Object.values(builds).map(build => ({
    mode: build.mode,
    entry: build.entry,
    target: build.target,
    watch,
    watchOptions: {
      ignored: /node_modules/,
    },
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      ...build.output,
    },
    node: false,
    externals: build.externals,
    externalsType: build.externalsType,
    resolve: build.resolve,
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new BundleAnalyzerPlugin(build.bundleAnalyzer || { analyzerMode: 'disabled' }),
    ],
  }));
};
