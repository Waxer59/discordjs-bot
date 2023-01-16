const context = {}
const OPTIONS = {
  isArray: false
}

const getAllContext = () => {
  return context
}

const getContextParam = (param = '') => {
  return context[param] ?? null
}

const addContextParam = (param = '', value, options = OPTIONS) => {
  context[param] = manageContextOptions(value, options)
  return context
}

const manageContextOptions = (value, { isArray }) => {
  if (isArray) {
    return [value]
  }
  return value
}

const removeContextParam = (param = '') => {
  delete context[param]
}

module.exports = {
  getAllContext,
  getContextParam,
  addContextParam,
  removeContextParam
}
