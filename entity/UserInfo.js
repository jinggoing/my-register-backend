const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  openid: String,
  sessionKey: String,
  unionid: String,
  nickName: String,
  gender: Number,
  language: String,
  city: String,
  province: String,
  country: String,
  avatarUrl: String
})
