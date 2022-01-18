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
// const TerserPlugin = require('terser-webpack-plugin')
// Gzip
// const CompressionPlugin = require('compression-webpack-plugin')

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
function resolve (dir) {
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
  chainWebpack: (config) => {
    config.resolve.alias
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('final-ui', resolve('src/final-ui'))
  },
  devServer: {
    contentBase: './',
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}
