const context = {}

const OPTIONS = {
  override: false
}

const getAllContext = () => {
  return context
}

const getServerContextParam = (serverId = '') => {
  return context[serverId] ?? null
}

const createServerContextParam = (param = '', value, options = OPTIONS) => {
  if (context[param] && !options.override) {
    throw new Error("You can't override a param in createServerContextParam function")
  }
  context[param] = { ...value, ...context[param] }
  return context
}

const editServerContextParam = (serverId = '', param = '', value) => {
  context[serverId][param] = value
  return context[serverId]
}

const removeServerContextParam = (serverId = '', param = '') => {
  delete context[serverId][param]
}

const removeAllServerContext = (serverId = '') => {
  delete context[serverId]
}

module.exports = {
  getAllContext,
  getServerContextParam,
  createServerContextParam,
  removeServerContextParam,
  editServerContextParam,
  removeAllServerContext
}
