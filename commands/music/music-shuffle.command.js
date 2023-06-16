const { SlashCommandBuilder } = require('discord.js')
const {
  musicShuffle
} = require('../../handlers/commands/musicSystem/controllers/musicShuflle')
const {
  handleMusicSystemExceptions
} = require('../../handlers/commands/musicSystem/handleMusicSystemExceptions')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music-shuffle')
    .setDescription('Shuffle the queue!'),
  async execute(interaction, client) {
    if (await handleMusicSystemExceptions(client, interaction)) {
      await interaction.reply({
        content: 'Your not inside a chanel/Nothing to shuffle!',
        ephemeral: true
      })
      return
    }
    musicShuffle(client, interaction)
    await interaction.reply({
      content: 'Queue shuffled!',
      ephemeral: true
    })
  }
}
