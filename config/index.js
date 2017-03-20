// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: process.env.NODE_ENV === 'testing' ? require('./test.env') : require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: (process.env.NODE_ENV === 'testing' ? '/test' : '') + '/cemni/',  // 项目发布的二级目录
    productionSourceMap: false, // 打包时是否生成SourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 打包时是否生成Gzip
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    proxyTable: {
      // The above example will proxy the request /wxApi/posts/1 to http://wx.gx10010.com/posts/1.
      '/wxApi': {
        target: 'http://wx.51pinzhi.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/wxApi': ''
        }
      },
      '/appApi': {
        target: 'https://api.pinzhi.xin/',
        changeOrigin: true,
        pathRewrite: {
          '^/appApi': ''
        }
      },
      '/dxbApi': {
        target: 'http://test.dmc.51pinzhi.cn/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/dxbApi': ''
        }
      },
    },
    openUrlQuery: '' // 调试时，启动页面参数，例如 '/index?cryptPhone=ILUV/Y34vi7INGusxX/jMA=='
  }
}
