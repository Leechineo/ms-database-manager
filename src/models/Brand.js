const mongoose = require('../config/db')
const uniqid = require('uniqid')

const BrandSchema = new mongoose.Schema({
  id: {
    type: String,
    default () {
      return uniqid('brand-')
    }
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  color: {
    type: Object,
    required: true
  },
  brandWebsite: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Brand = mongoose.model('brands', BrandSchema);

module.exports = Brand;
