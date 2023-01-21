const mongoose = require('mongoose')
const { getEnvVariables } = require('../environment/envVariables')

const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(getEnvVariables().MONGODB_CNN)

    console.log('DB is ready!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  dbConnection
}
