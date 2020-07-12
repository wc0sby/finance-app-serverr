const mon = require('mongoose')
const CategorySchema = require('./categorySchema.js')
const EntryTypeSchema = require('./entryTypes.js')

const UserSchema = new mon.Schema({
  firstName: String,
  lastName: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  categories: [CategorySchema],
  entryTypes: [EntryTypeSchema],
  created_at: {type:Date, default: Date.now},
  updated_at: {type:Date, default: Date.now}
})

module.exports = mon.model('User',UserSchema)