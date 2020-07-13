const mon = require('mongoose')

const Category = new mon.Schema({
  category: {type: String, required: true, unique: true},
  created_at: {type: Date, default: Date.now},
  isActive: Boolean
})

module.exports = Category