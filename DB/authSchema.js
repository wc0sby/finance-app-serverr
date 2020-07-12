const mon = require('mongoose')
const categories = require('./categorySchema.js')

const UserSchema = new mon.Schema({
  firstName: String,
  lastName: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  categories: [categories],
  entityTypes: [],
  sharedUsers: [],
  created_at: Date,
  updated_at: Date
})

module.exports = mon.model('User',UserSchema)