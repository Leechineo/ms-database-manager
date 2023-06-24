const mongoose = require('../config/db')

const SettingsSchema = new mongoose.Schema({
  id: {
    type: String,
    default() {
      return uniqid('setting-')
    }
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Settings = mongoose.model('settings', SettingsSchema)

module.exports = Settings
