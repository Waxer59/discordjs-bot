const { SlashCommandBuilder } = require('discord.js')
const {
  musicStop
} = require('../../handlers/commands/musicCommand/controllers/musicStop')
const {
  handleMusicExceptions
} = require('../../handlers/commands/musicCommand/handleMusicExceptions')

module.exports = {
  name: 'music-stop',
  data: new SlashCommandBuilder()
    .setName('music-stop')
    .setDescription('Stop the song!'),
  async execute(interaction, client) {
    if (await handleMusicExceptions(client, interaction)) {
      await interaction.reply({
        content: 'Your not inside a chanel/Nothing to stop!',
        ephemeral: true
      })
      return
    }
    musicStop(client, interaction)
    await interaction.reply({
      content: 'Queue stoped',
      ephemeral: true
    })
  }
}
