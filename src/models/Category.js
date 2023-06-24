const mongoose = require('../config/db')

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  subcategories: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('categories', CategorySchema)

module.exports = Category
