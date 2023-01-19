const { SlashCommandBuilder } = require('discord.js')
const {
  musicStop
} = require('../../handlers/musicCommand/controller/musicStop')

module.exports = {
  name: 'music-stop',
  data: new SlashCommandBuilder()
    .setName('music-stop')
    .setDescription('Stop the song!'),
  async execute(interaction, client) {
    musicStop(client, interaction)
    interaction.reply({
      content: 'Queue stoped',
      ephemeral: true
    })
  }
}
