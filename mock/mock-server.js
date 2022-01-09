const bodyParser = require('body-parser')
const { registerRoutes } = require('./index.js')

module.exports = devServer => {
  const app = devServer.app
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

 registerRoutes(app)
}
