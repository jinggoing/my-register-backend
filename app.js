const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('./router/router.js')
const app = new Koa()
const mongoose = require('mongoose')
const mongodbConfig = require('./config/mongodb.config')

mongoose.connect(`mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.db}`, {useNewUrlParser: true})
const con = mongoose.connection
con.on('error', function () {
  console.log('mongodb connected fail')
})
con.once('open', function () {
  console.log('mongodb connected success')
})

// 处理跨域的配置
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous']
}))

app.use(bodyParser())  // 解析request的body

app.use(router.routes())
app.listen(9000)
console.log('app started at port 9000...')
