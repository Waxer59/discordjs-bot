const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  name: 'ping',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction, client) {
    await interaction.reply({
      content: `🦕 ${client.ws.ping}ms | status: ${client.ws.status}`
    })
  }
}
