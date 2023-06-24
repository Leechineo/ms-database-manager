const uniqid = require('uniqid')
const mongoose = require('../config/db')

const StockSchema = new mongoose.Schema({
  id: {
    type: String,
    default () {
      return uniqid('stock-')
    }
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'br'
  },
  shippingMethod: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Stock = mongoose.model('stocks', StockSchema)

module.exports = Stock
