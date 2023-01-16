const mongoose = require('mongoose')
const { getEnvVariables } = require('../environment/envVariables')

const dbConnection = async () => {
  try {
    await mongoose.connect(getEnvVariables().MONGO_CNN)

    console.log('DB is ready!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  dbConnection
}
