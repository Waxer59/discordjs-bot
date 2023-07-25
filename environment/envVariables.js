require('dotenv').config()

const getEnvVariables = () => {
  return {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    MONGODB_CNN: process.env.MONGODB_CNN,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_USERNAME: process.env.REDIS_USERNAME
  }
}

module.exports = {
  getEnvVariables
}
