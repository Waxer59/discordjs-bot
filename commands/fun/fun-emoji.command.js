const { SlashCommandBuilder } = require('discord.js')
const { emojis } = require('./fun-constants')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emoji')
    .setDescription('Gives a random emoji!'),
  async execute(interaction, client) {
    await interaction.reply(emojis[Math.floor(Math.random() * emojis.length)])
  }
}
