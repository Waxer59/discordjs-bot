const { Events } = require('discord.js')
const {
  handleSumbitTicketForm
} = require('../commands/ticketSystem/handleTicketSystemChannels')
const { handleButtonInteractions } = require('../handleButtonInteractions')

const clientOnInteractionCreate = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
      handleButtonInteractions(client, interaction)
    }
    if (interaction.customId === 'form-ticket' && interaction.isModalSubmit()) {
      handleSumbitTicketForm(interaction)
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
