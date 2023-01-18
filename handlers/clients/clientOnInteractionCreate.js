const { Events } = require('discord.js')
const {
  handleMusicButtonsInteractions
} = require('../musicCommand/handleMusicChannels')

const clientOnInteractionCreate = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
      handleMusicButtonsInteractions(client, interaction, interaction.customId)
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
}

module.exports = {
  clientOnInteractionCreate
}
