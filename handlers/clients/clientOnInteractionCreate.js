const { Events } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const {
  handleMusicButtonsInteractions
} = require('../commands/musicCommand/handleMusicChannels')

const clientOnInteractionCreate = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    const channelId = interaction.channel.id
    if (interaction.isButton()) {
      if (
        channelId ===
          getContextParam(`${interaction.guild.id}`)?.[
            contextTypes().MUSIC_CHANNEL
          ]?.channelId &&
        interaction.guild.members?.me.voice.channelId ===
          interaction.member.voice.channelId
      ) {
        handleMusicButtonsInteractions(
          client,
          interaction,
          interaction.customId
        )
      }
    }
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction, client)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    }
  })
}

module.exports = {
  clientOnInteractionCreate
}
