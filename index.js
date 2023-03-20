const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { DisTube } = require('distube')
const { deploySlashCommands } = require('./helpers/deploy-commands')
const { handleClientEvents } = require('./handlers/handleClientEvents')
const { dbConnection } = require('./db/config')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

connectToDatabase()

client.commands = new Collection()

//* SETUP COMMANDS
deploySlashCommands(client)

//* MUSIC LIBRARY
const player = new DisTube(client)
client.player = player

handleClientEvents(client)

async function connectToDatabase() {
  await dbConnection()
}
