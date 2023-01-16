const { getEnvVariables } = require('./environment/envVariables')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')
const { deploySlashCommands } = require('./deploy-commands')
const { Player } = require('discord-music-player')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
})
client.commands = new Collection()
deploySlashCommands(client)
const player = new Player(client)
client.player = player

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    })
  }
})

//* READY!
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(getEnvVariables().DISCORD_TOKEN)

module.exports = client
