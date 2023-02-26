const { Events } = require('discord.js')
const { handleButtonInteractions } = require('../handleButtonInteractions')
const { handleModalsInteractions } = require('../handleModalsInteractions')

const MODALS_IDS = ['form-ticket', 'sourcebin']

const clientOnInteractionCreate = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
      handleButtonInteractions(client, interaction)
    }
    if (
      MODALS_IDS.includes(interaction.customId) &&
      interaction.isModalSubmit()
    ) {
      handleModalsInteractions(interaction, client)
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
