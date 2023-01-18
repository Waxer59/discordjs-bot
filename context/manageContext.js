const context = {
  MUSIC_CHANNELS: [],
  TICKET_CHANNELS: []
}
const OPTIONS = {
  isArray: false,
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
    throw new Error("You can't override a param in addContextParam function")
  }
  context[param] = manageContextOptions(param, value, options)
  return context
}

const editContextParam = async (param = '', value) => {
  context[param] = value
  return context[param]
}

const manageContextOptions = (param = '', value = '', options) => {
  if (options?.isArray) {
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
  createContextParam,
  removeContextParam,
  editContextParam
}
