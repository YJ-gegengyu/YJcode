/*
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·小涛
 * @Date: 2020-06-22 09:06:14
 * @,@LastEditors: ,: MR·小涛
 * @,@LastEditTime: ,: 2021-01-02 20:41:47
 */
const path = require('path')
// 去除console
const TerserPlugin = require('terser-webpack-plugin')
// Gzip
const CompressionPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 定义静态目录文件夹
  assetsDir: 'static',
  publicPath: '/',
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/scss/variables.scss";
        `
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const minimizer = [
        new TerserPlugin({
          sourceMap: false,
          terserOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        }),
        new CompressionPlugin({
          algorithm: 'gzip',
          minRatio: 0.8,
          test: productionGzipExtensions,
          threshold: 10240,
          deleteOriginalAssets: false
        })
      ]
      return {
        output: {
          library: 'myProject',
          libraryTarget: 'umd'
        },
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          'element-ui': 'ELEMENT',
          axios: 'axios'
        },
        optimization: {
          minimizer
        }
      }
    } else {
      return {
        output: {
          library: 'myProject',
          libraryTarget: 'umd'
        },
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          'element-ui': 'ELEMENT',
          axios: 'axios'
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('directive', resolve('src/directive'))
      .set('final-ui', resolve('src/final-ui'))
      .set('mixin', resolve('src/mixin'))
      .set('json', resolve('src/json'))
      .set('views', resolve('src/views'))
      .set('goods-list', resolve('src/views/goods-list'))
      .set('gift-list', resolve('src/views/gift-list'))
      .set('home-box', resolve('src/views/home-box'))
  },
  devServer: {
    contentBase: './',
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}
