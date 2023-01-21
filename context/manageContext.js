const context = {}

const OPTIONS = {
  override: false
}

const getAllContext = () => {
  return context
}

const getContextParam = (param = '') => {
  return context[param] ?? null
}

const createContextParam = (param = '', value, options = OPTIONS) => {
  if (context[param] && !options.override) {
    throw new Error("You can't override a param in createContextParam function")
  }
  context[param] = value
  return context
}

const editContextParam = async (param = '', value) => {
  context[param] = value
  return context[param]
}

const removeContextParam = (param = '') => {
  delete context[param]
}

module.exports = {
  getAllContext,
  getContextParam,
  createContextParam,
  removeContextParam,
  editContextParam
}
