require('dotenv').config()
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const path = require('path')
const Model = require('./config/Model')
const auth = require('./middlewares/auth')

const app = express()

const modelsFiles = fs.readdirSync(path.resolve('src', 'models'))

const models = modelsFiles.reduce((acc, file) => {
  const modelName = file.replace('.js', '')
  acc[modelName] = require(path.resolve('src', 'models', file))
  return acc
}, {})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(auth())

app.post('/:model', async (req, res) => {
  const data = req.body
  try {
    if (!req.params.model) {
      return res.status(400).send()
    }
    const model = Model(models[req.params.model])
    if (!model) {
      return res.status(404).send()
    }
    const result = await model.create(data)
    return res.send(result)
  } catch (e) {
    return res.status(500).send()
  }
})

app.get('/:model', async (req, res) => {
  const documentId = req.query.id
  let documentFilters
  try {
    documentFilters = JSON.parse(req.query.filters)
  } catch (e) {
    documentFilters = {}
  }

  try {
    if (!req.params.model) {
      return res.status(400).send()
    }
    const model = Model(models[req.params.model])
    if (!model) {
      return res.status(404).send()
    }
    if (!documentId && !Object.keys(documentFilters).length) { // Model.find()
      const results = await model.find()
      return res.send(results)
    }
    if (documentId) { // Model.findById()
      const result = await model.findById(documentId)
      if (!result) {
        return res.status(404).send()
      }
      return res.send(result)
    }
    if (Object.keys(documentFilters).length) { // Model.findOne()
      const result = await model.findOne(documentFilters)
      if (!result) {
        return res.status(404).send()
      }
      return res.send(result)
    }
    return res.send(req.params.model)
  } catch (e) {
    console.log(e)
    return res.status(500).send()
  }
})

app.patch('/:model', async (req, res) => {
  const documentId = req.query.id
  const data = req.body
  let documentFilters
  try {
    documentFilters = JSON.parse(req.query.filters)
  } catch (e) {
    documentFilters = {}
  }

  try {
    if (!req.params.model || !(documentId || Object.keys(documentFilters).length)) {
      return res.status(400).send()
    }
    const model = Model(models[req.params.model])
    if (!model) {
      return res.status(404).send()
    }
    if (documentId) {
      const result = await model.findByIdAndUpdate(documentId, data)
      return res.send(result)
    }
    const result = await model.findOneAndUpdate(documentFilters, data)
    return res.send(result)
  } catch (e) {
    return res.status(500).send()
  }
})

app.delete('/:model', async (req, res) => {
  const documentId = req.query.id
  let documentFilters
  try {
    documentFilters = JSON.parse(req.query.filters)
  } catch (e) {
    documentFilters = {}
  }

  try {
    if (!req.params.model || !(documentId || Object.keys(documentFilters).length)) {
      return res.status(400).send()
    }
    const model = Model(models[req.params.model])
    if (!model) {
      return res.status(404).send()
    }
    if (documentId) {
      const result = await model.findByIdAndDelete(documentId)
      return res.send(result)
    }
    const result = await model.findOneAndDelete(documentFilters)
    return res.send(result)
  } catch (e) {
    return res.status(500).send()
  }
})

const appPort = process.env.MS_DB_MANAGER_PORT || process.env.PORT || 5000

app.listen(appPort, () => console.log('Microservice DB Manager Running at port', appPort))
