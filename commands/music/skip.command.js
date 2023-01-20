const { SlashCommandBuilder } = require('discord.js')
const {
  musicSkip
} = require('../../handlers/musicCommand/controllers/musicSkip')
const {
  handleMusicExceptions
} = require('../../handlers/musicCommand/handleMusicExceptions')

module.exports = {
  name: 'music-skip',
  data: new SlashCommandBuilder()
    .setName('music-skip')
    .setDescription('Skip the song!'),
  async execute(interaction, client) {
    if (await handleMusicExceptions(client, interaction)) {
      interaction.reply({
        content: 'Your not inside a chanel/Nothing to skip!',
        ephemeral: true
      })
      return
    }
    musicSkip(client, interaction)
    interaction.reply({
      content: 'Song skipped!',
      ephemeral: true
    })
  }
}
