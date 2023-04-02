const context = {}

const getAllContext = () => {
  return context
}

const getServerContextParam = (serverId) => {
  return context[`${serverId}`] ?? null
}

const createServerContextParam = (serverId, value) => {
  context[`${serverId}`] = { ...value, ...context[serverId] }
  return context
}

const editServerContextParam = (serverId, param, value) => {
  context[`${serverId}`][`${param}`] = value
  return context[`${serverId}`]
}

const removeServerContextParam = (serverId, param) => {
  delete context[`${serverId}`][`${param}`]
}

const removeAllServerContext = (serverId) => {
  delete context[`${serverId}`]
}

module.exports = {
  getAllContext,
  getServerContextParam,
  createServerContextParam,
  removeServerContextParam,
  editServerContextParam,
  removeAllServerContext
}
