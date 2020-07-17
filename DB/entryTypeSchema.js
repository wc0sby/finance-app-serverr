const mon = require('mongoose')

const Entry = new mon.Schema({
  name: String,
  isActive: Boolean
})

module.exports = Entry