const { SlashCommandBuilder } = require('discord.js')
const { getAllContext } = require('../../context/manageContext')

module.exports = {
  name: 'ping',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction, client) {
    console.log(getAllContext())
    await interaction.reply('Pong!')
  }
}
