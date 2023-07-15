const uniqid = require('uniqid')
const mongoose = require('../config/db')

const ShippingMethodSchema = new mongoose.Schema({
  id: {
    type: String,
    default () {
      return uniqid('shippin_method-')
    }
  },
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
