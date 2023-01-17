const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
const { join } = require('node:path')
const { getEnvVariables } = require('../environment/envVariables')

const readCommandFiles = (dir = '', client) => {
  const rootPath = join(__dirname, '../', dir)
  const commandFolders = fs.readdirSync(rootPath)

  const commands = []

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`${rootPath}/${folder}`)
      .filter((file) => file.endsWith('.js'))

    for (const file of commandFiles) {
      const command = require(`${rootPath}/${folder}/${file}`)
      if (command.data) {
        commands.push(command.data.toJSON())
        client.commands.set(command.name, command)
      }
    }
  }
  return commands
}

const initializeCommands = async (commands = [], rest) => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    const data = await rest.put(
      Routes.applicationCommands(getEnvVariables().DISCORD_CLIENT_ID),
      { body: commands }
    )

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
}

const deploySlashCommands = async (client) => {
  const slashCommands = readCommandFiles('commands', client)

  const rest = new REST({ version: '10' }).setToken(
    getEnvVariables().DISCORD_TOKEN
  )

  initializeCommands([...slashCommands], rest)
}

module.exports = {
  deploySlashCommands
}
