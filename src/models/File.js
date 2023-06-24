const mongoose = require('../config/db')

const FileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'dynamic'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const File = mongoose.model('files', FileSchema)

module.exports = File
