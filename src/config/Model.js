const Model = (model) => {
  const create = async (props) => {
    const result = await model.create(props)
    return result
  }

  const find = async (params = { filters: {}, sort: {}, showId: false }) => {
    const result = await model.find(params.filters).sort(params.sort)
    let items = result
    if (!params.showId) {
      items = result.map((item) => {
        item._id = undefined
        return item
      })
    }
    return items
  }

  const findById = async (id, params = { select: '' }) => {
    if (params.select) {
      const result = await model.findById(id).select(params.select)
      return result
    }
    const result = await model.findById(id)
    return result
  }

  const findByIdAndUpdate = async (id, props) => {
    const result = await model.findByIdAndUpdate(id, props)
    return result
  }
  const findByIdAndDelete = async (id) => {
    const result = await model.findByIdAndDelete(id)
    return result
  }

  const findOne = async (filter = {}) => {
    const result = await model.findOne(filter)
    return result
  }

  const findOneAndUpdate = async (filter, params) => {
    const result = await model.findOneAndUpdate(filter, params)
    return result
  }
  const findOneAndDelete = async (id) => {
    const result = await model.findOneAndDelete(id)
    return result
  }

  return {
    create, find, findById, findByIdAndUpdate, findByIdAndDelete, findOne, findOneAndUpdate, findOneAndDelete
  }
}

module.exports = Model
