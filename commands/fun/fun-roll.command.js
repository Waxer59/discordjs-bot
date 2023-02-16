const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  name: 'roll',
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Gives a number between 1 and 6'),
  async execute(interaction, client) {
    await interaction.reply(`${Math.floor(Math.random() * 6) + 1}`)
  }
}
