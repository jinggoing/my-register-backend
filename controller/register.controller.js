const mongoose = require('mongoose')
const registerSchema = require('../entity/Register.js')
let Model = mongoose.model('register', registerSchema)

module.exports = {
  save: async function (obj) {
    let register = new Model(obj)
    return register.save()
  },
  query: async function (obj) {
    return Model.find(obj)
  },
  queryById: async function (_id) {
    return Model.findOne({_id: _id})
  },
  updateOne: async function (obj) {
    if (obj._id) {
      return Model.updateOne({ _id: obj._id }, obj)
    } else {
      return '_id is null'
    }
  }
}
