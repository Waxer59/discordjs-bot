const { SlashCommandBuilder } = require('discord.js')
const {
  musicShuffle
} = require('../../handlers/commands/music/controllers/musicShuflle')
const {
  handleMusicExceptions
} = require('../../handlers/commands/music/handleMusicExceptions')

module.exports = {
  name: 'music-shuffle',
  data: new SlashCommandBuilder()
    .setName('music-shuffle')
    .setDescription('Shuffle the queue!'),
  async execute(interaction, client) {
    if (await handleMusicExceptions(client, interaction)) {
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
