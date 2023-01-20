const { SlashCommandBuilder } = require('discord.js')
const {
  musicSkip
} = require('../../handlers/musicCommand/controller/musicSkip')

module.exports = {
  name: 'music-skip',
  data: new SlashCommandBuilder()
    .setName('music-skip')
    .setDescription('Skip the song!'),
  async execute(interaction, client) {
    musicSkip(client, interaction)
    interaction.reply({
      content: 'Song skipped!',
      ephemeral: true
    })
  }
}
