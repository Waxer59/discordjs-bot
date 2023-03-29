const { SlashCommandBuilder } = require('discord.js')
const {
  musicSkip
} = require('../../handlers/commands/musicSystem/controllers/musicSkip')
const {
  handleMusicSystemExceptions
} = require('../../handlers/commands/musicSystem/handleMusicSystemExceptions')

module.exports = {
  name: 'music-skip',
  data: new SlashCommandBuilder()
    .setName('music-skip')
    .setDescription('Skip the song!'),
  async execute(interaction, client) {
    if (await handleMusicSystemExceptions(client, interaction)) {
      await interaction.reply({
        content: 'Your not inside a chanel/Nothing to skip!',
        ephemeral: true
      })
      return
    }
    musicSkip(client, interaction)
    await interaction.reply({
      content: 'Song skipped!',
      ephemeral: true
    })
  }
}
