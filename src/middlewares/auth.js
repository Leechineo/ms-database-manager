require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Leechineo = require('leechineo-backend-plugin')
const Settings = require('../models/Setting')

function auth (required = true) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      if (!required) {
        req.user = {
          logged: false
        }
        return next()
      }
      return res.status(401).send(Leechineo.errors.auth.loginRequired)
    }
    const parts = authHeader.split(' ')
    if (parts.length !== 2) {
      return res.status(401).send(Leechineo.errors.auth.loginRequired)
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send(Leechineo.errors.auth.loginRequired)
    }

    jwt.verify(token, process.env.LEECHINEO_AUTH_HASH, async (err, decoded) => {
      if (err) {
        return res.status(401).send(Leechineo.errors.auth.loginRequired)
      }
      const passwordConfig = await Settings.findOne({ name: 'database_password' })
      if (!passwordConfig) {
        return next()
      }
      if (!await bcrypt.compare(passwordConfig.value, decoded.secretpass)) {
        return res.status(401).send(Leechineo.errors.auth.loginRequired)
      }

      return next()
    })
  }
}
module.exports = auth
