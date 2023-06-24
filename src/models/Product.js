const mongoose = require('../config/db')

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 250
  },
  description: {
    type: String,
    maxlength: 10000
  },
  images: {
    type: Array,
    default: []
  },
  specifications: {
    type: Array,
    default: []
  },
  category: {
    type: String,
    default: ''
  },
  brand: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'product'
  },
  stocks: {
    type: Array,
    required: true
  },
  private: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ProductSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next()
  }
  try {
    const highestProduct = await this.constructor.findOne().sort('-id').exec()
    const highestId = highestProduct ? highestProduct.id : 0
    this.id = highestId + 1
    next()
  } catch (error) {
    next(error)
  }
})

ProductSchema.index({ name: 'text', description: 'text' })

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
