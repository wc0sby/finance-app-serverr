const mon = require('mongoose')

const Entry = new mon.Schema({
  name: {type: String, required: true},
  isActive: {type: Boolean, default: 1},
  type: String,
  category: String,
  createdBy: String,
  lastUpdated: {type:Date, default:Date.now},
  budgetAmt: Number,
  actualAmt: Number,
  isVariance: Boolean,
  isPaid: Boolean,
  varianceAmt: Number,
  month: Number,
  year: Number

})

module.exports = Entry