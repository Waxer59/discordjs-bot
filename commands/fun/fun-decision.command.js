const { SlashCommandBuilder } = require('discord.js')
const { decisionsAlternatives } = require('./fun-constants')

module.exports = {
  name: 'decision',
  data: new SlashCommandBuilder()
    .setName('decision')
    .setDescription('Make a decision now!'),
  async execute(interaction, client) {
    await interaction.reply(
      decisionsAlternatives[
        Math.floor(Math.random() * decisionsAlternatives.length)
      ]
    )
  }
}
