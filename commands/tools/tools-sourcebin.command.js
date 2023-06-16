const {
  SlashCommandBuilder,
} = require('discord.js')
const { MODAL } = require('./constants/tools-sourcebin-constants')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sourcebin')
    .setDescription('Create a link to your text file!'),
  async execute(interaction, client) {
    await interaction.showModal(MODAL)
  }
}
