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
  context[param] = { ...value, ...context[param] }
  return context
}

const editContextParam = (serverId = '', param = '', value) => {
  context[serverId][param] = value
  return context[serverId]
}

const pushContextParam = (serverId = '', param = '', value) => {
  context[serverId][param].push(value)
  return context[serverId]
}

const removeContextParam = (serverId = '', param = '') => {
  delete context[serverId][param]
}

module.exports = {
  getAllContext,
  getContextParam,
  createContextParam,
  removeContextParam,
  editContextParam,
  pushContextParam
}
