const mon = require('mongoose')

const Category = new mon.Schema({
  name: String,
  description: String,
  created_at: Date,
  isActive: Boolean
})

module.exports = Category