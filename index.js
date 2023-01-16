const { getEnvVariables } = require('./environment/envVariables')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')
const { deploySlashCommands } = require('./deploy-commands')
const { Player } = require('discord-music-player')
const { getContextParam, editContextParam } = require('./context/manageContext')
const { contextTypes } = require('./context/types/contextTypes')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
})

client.commands = new Collection()

//* SETUP COMMANDS
deploySlashCommands(client)

//* MUSIC LIBRARY
const player = new Player(client)
client.player = player

client.on('messageCreate', async (interaction) => {
  const channelId = interaction.channel.id
  //* MUSIC_CHANNELS LOGIC
  if (getContextParam(contextTypes().MUSIC_CHANNELS).includes(channelId)) {
    console.log('MUSIC_CHANNELS')
    console.log(getContextParam(contextTypes().MUSIC_CHANNELS))
  }
})

client.on('channelDelete', async (channel) => {
  const channelId = channel.id
  //* MUSIC_CHANNELS DELETE LOGIC
  if (getContextParam(contextTypes().MUSIC_CHANNELS).includes(channelId)) {
    editContextParam(
      contextTypes().MUSIC_CHANNELS,
      getContextParam(contextTypes().MUSIC_CHANNELS).filter(
        (id) => id !== channelId
      ) ?? []
    )
  }
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    const commandReturnValue = await command.execute(interaction, client)

    //* Manage the context of the app
    if (commandReturnValue) {
      context[commandReturnValue.name] = commandReturnValue.value
    }
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