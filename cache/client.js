const { createClient } = require('redis')
const { getEnvVariables } = require('../environment/envVariables')

const client = createClient({
  username: getEnvVariables().REDIS_USERNAME,
  password: getEnvVariables().REDIS_PASSWORD,
  socker: {
    port: getEnvVariables().REDIS_PORT,
    host: getEnvVariables().REDIS_HOST
  }
})

client.on('error', (err) => console.log('Redis Client Error', err))
;(async () => await client.connect())()

async function setValue(key, value) {
  const val = await client.set(key, JSON.stringify(value))
  return val
}

async function getValue(key) {
  const value = await client.get(key)
  return JSON.parse(value)
}

async function deleteValue(key) {
  const val = await client.del(key)
  return val
}

async function deleteAllValues() {
  await client.flushAll()
}

module.exports = {
  setValue,
  getValue,
  deleteValue,
  deleteAllValues
}
