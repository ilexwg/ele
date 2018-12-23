const path = require('path')
const appData = require('./data.json')
const { seller, goods, ratings } = appData

// 解析目录的方法
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  // 配置express服务器
  devServer: {
    before (app) {
      app.get('/api/seller', function (req, res) {
        const id = req.query.id
        res.json({
          errno: 0,
          data: Object.assign({}, seller, { id })
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  // 设置解析目录的别名
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  }
}
