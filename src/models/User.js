const bcrypt = require('bcryptjs')
const mongoose = require('../config/db')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  birthday: {
    type: Object,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  selectedAddress: {
    type: String,
    default: ''
  },
  paymentMethods: {
    type: Array,
    default: []
  },
  favorites: {
    type: Array,
    default: []
  },
  verifiedEmail: {
    type: Boolean,
    default: false
  },
  verifiedAccount: {
    type: Boolean,
    default: false
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  emailConfirmationToken: {
    type: String
  },
  emailConfirmationTokenExpiresIn: {
    type: Date
  },
  orders: {
    type: Array,
    default: []
  },
  usedTickets: {
    type: Array,
    default: []
  },
  admin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const User = mongoose.model('Users', UserSchema)

module.exports = User
