import { defineConfig } from 'umi';
import path from 'path';
import routes from './route.config';
import proxy from './proxy.config';
import theme from './theme.config';


export default defineConfig({
  base: '/',
  publicPath: '/',
  routes: routes,
  proxy: proxy,
  theme: theme,
  antd: {},
  dva: {
    immer: true,
    hmr: false,
  },
  dynamicImport: {
    loading: '@components/common/PageLoadingEmpty'
  },
  locale: {
    default: 'en-US',
    baseNavigator: false,
  },
  targets: {
    ie: 9,
  },
  ignoreMomentLocale: true,
  hash: true,
  alias: {
    '@': path.resolve(__dirname, '../src'),
    '@images': path.resolve(__dirname, '../src/assets/images'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@services': path.resolve(__dirname, '../src/services'),
    '@components': path.resolve(__dirname, '../src/components'),
    '@contexts': path.resolve(__dirname, '../src/contexts'),
    '@hooks': path.resolve(__dirname, '../src/hooks')
  },
  chainWebpack(config) {
    config.module
      .rule('woff')
      .test(/.(woff|eot|otf|ttf|mp4)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        limit: 20000,
        name: '[name].[hash:8].[ext]'
      });
  },
  devServer: {
    port: 8001
  }
});