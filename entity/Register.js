const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  openid: String,
  application: String,
  website: String,
  phone: String,
  email: String,
  thirdParty: String
})
