const db = require('mongoose')

db.set('strictQuery', true)

db.connect(process.env.MS_DB_MANAGER_DBURL || '').then(() => {
  console.log('Connected to DB.')
}).catch((e) => {
  console.log('Connection with DB failed,', process.env.MS_DB_MANAGER_DBURL, e)
})

db.Promise = global.Promise

module.exports = db
