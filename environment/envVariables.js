require('dotenv').config()

const getEnvVariables = () => {
  return {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    MONGO_CNN: process.env.MONGO_CNN,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID
  }
}

module.exports = {
  getEnvVariables
}
