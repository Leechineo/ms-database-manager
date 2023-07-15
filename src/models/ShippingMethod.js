const mongoose = require('../config/db')

const ShippingMethodSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  defaultMapping: {
    type: Object,
    required: true
  },
  mappings: {
    type: Array
  },
  products: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const ShippingMethod = mongoose.model('shppingmethods', ShippingMethodSchema)

module.exports = ShippingMethod
