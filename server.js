var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

// Set the host and port according to env file
var HOST = '0.0.0.0'
var PORT = 3002

// Create a new server
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(PORT, HOST, function (err, result) {
    if (err) {
      console.log(err)
    }

    console.log(`Running at ${HOST}:${PORT}`)
  })