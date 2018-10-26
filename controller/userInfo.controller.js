const mongoose = require('mongoose')
const userInfoSchema = require('../entity/UserInfo.js')
let Model = mongoose.model('userInfo', userInfoSchema)

module.exports = {
  save: async function (obj) {
    let user = new Model(obj)
    return user.save()
  },
  queryOne: async function (obj) {
    return Model.findOne(obj)
  }
}
