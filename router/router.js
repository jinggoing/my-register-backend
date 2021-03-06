const Router = require('koa-router')
const userInfoController = require('../controller/userInfo.controller')
const registerController = require('../controller/register.controller')
const responseStandard = require('./response.standard.js')
const axios = require('axios')
const xcxConfig = require('../config/xcx.config')

const router = new Router({
  prefix: '/api'
})

router.post('/user/save', async (ctx, next) => {
  console.log('start', ctx.request.rawBody)
  try {
    const obj = JSON.parse(ctx.request.rawBody)
    console.log('obj.openid', obj.openid)
    const query = await userInfoController.queryOne({openid: obj.openid})
    if (query === null) {
      const save = await userInfoController.save(obj)
      ctx.response.body = responseStandard.success(save)
    } else {
      ctx.response.body = responseStandard.success(query, {code: 110, msg: 'openid already exits'})
    }
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
  next()
})

router.get('/user/query/:openid', async (ctx, next) => {
  console.log('query user')
  const obj = ctx.params
  try {
    const query = await userInfoController.queryOne(obj)
    if (query === null) {
      ctx.response.body = responseStandard.other(query, {code: 998, msg: 'openid is not exits'})
    } else {
      ctx.response.body = responseStandard.success(query)
    }
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
  next()
})

router.post('/register/save', async (ctx, next) => {
  console.log('register save', ctx.request.rawBody)
  try {
    const obj = JSON.parse(ctx.request.rawBody)
    const query = await userInfoController.queryOne({openid: obj.openid})
    if (query === null) {
      ctx.response.body = responseStandard.other(query, {code: 998, msg: 'openid is not exits'})
    } else {
      console.log('obj.openid', obj.openid)
      const save = await registerController.save(obj)
      ctx.response.body = responseStandard.success(save)
    }
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
  next()
})

router.get('/register/query/:openid', async (ctx, next) => {
  try {
    const query = await registerController.query(ctx.params)
    ctx.response.body = responseStandard.success(query)
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
  next()
})

router.post('/register/update', async (ctx, next) => {
  try {
    const obj = JSON.parse(ctx.request.rawBody)
    delete obj['deleted']
    console.log('obj', obj)
    const update = await registerController.updateOne(obj)
    ctx.response.body = responseStandard.success(update)
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
})

router.get('/register/delete/:id', async (ctx, next) => {
  try {
    const id = ctx.params.id
    const update = await registerController.deleteOne(id)
    console.log('update', update)
    ctx.response.body = responseStandard.other(update, {code: 100, msg: 'the record has deleted'})
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
})

router.get('/miniprogram/code2Session/:code', async (ctx, next) => {
  const code2SessionUrl = 'https://api.weixin.qq.com/sns/jscode2session'
  const appid = xcxConfig.appid
  const appSecret = xcxConfig.appSecret
  const code = ctx.params.code
  try {
    const response = await axios.get(`${code2SessionUrl}?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`)
    console.log('response', response.data)
    ctx.response.body = responseStandard.other(response.data, {code: 109, msg: 'wechat response'})
  } catch (error) {
    ctx.response.body = responseStandard.fail(error)
  }
})

module.exports = router
