const { SlashCommandBuilder } = require('discord.js')
const {
  musicStop
} = require('../../handlers/commands/musicSystem/controllers/musicStop')
const {
  handleMusicSystemExceptions
} = require('../../handlers/commands/musicSystem/handleMusicSystemExceptions')

module.exports = {
  name: 'music-stop',
  data: new SlashCommandBuilder()
    .setName('music-stop')
    .setDescription('Stop the song!'),
  async execute(interaction, client) {
    if (await handleMusicSystemExceptions(client, interaction)) {
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
