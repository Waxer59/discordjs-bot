const {
  getContextParam,
  editContextParam
} = require('../context/manageContext')
const { contextTypes } = require('../context/types/contextTypes')
const { getEnvVariables } = require('../environment/envVariables')
const { Events } = require('discord.js')
const {
  handleMusicChannels,
  handleBotDisconnection,
  handleButtonsInteractions
} = require('./musicCommand/handleMusicChannels')

const handleClientEvents = (client) => {
  client.on(Events.MessageCreate, async (interaction) => {
    if (interaction.author.bot) {
      return
    }
    const channelId = interaction.channel.id
    const voiceChannel = interaction.member.voice.channel?.id
    //* MUSIC_CHANNELS LOGIC
    if (
      getContextParam(contextTypes().MUSIC_CHANNELS).some(
        (channel) => channel.channelId === channelId
      )
    ) {
      await handleMusicChannels(client, interaction, {
        voiceChannel,
        channelId
      })
    }
  })

  client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    if (oldState.channelId === newState.chanelId)
      return console.log('Mute/Deafen Update')

    if (!oldState.channelId && newState.channelId)
      return console.log('Connection Update')

    if (oldState.channelId && !newState.channelId) {
      handleBotDisconnection(client)
      return console.log(`${client.user.username} was disconnected!`)
    }
  })

  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    //* MUSIC_CHANNELS DELETE LOGIC
    if (
      getContextParam(contextTypes().MUSIC_CHANNELS).some(
        (channel) => channel.channelId === channelId
      )
    ) {
      editContextParam(
        contextTypes().MUSIC_CHANNELS,
        getContextParam(contextTypes().MUSIC_CHANNELS).filter(
          (channel) => channel.channelId !== channelId
        ) ?? []
      )
    }
  })
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
      handleButtonsInteractions(client, interaction, interaction.customId)
      // console.log(getAllContext().MUSIC_CHANNELS[0].controls.pause);
    }
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
    c.user.setPresence({ activities: [{ name: 'discord.js' }] })
  })

  client.login(getEnvVariables().DISCORD_TOKEN)
}

module.exports = {
  handleClientEvents
}
