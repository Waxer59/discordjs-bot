const { SlashCommandBuilder } = require('discord.js')
const {
  musicPlay
} = require('../../handlers/musicCommand/controllers/musicPlay')

module.exports = {
  name: 'music-play',
  data: new SlashCommandBuilder()
    .setName('music-play')
    .setDescription('Play a song!')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('Name or URL of the song')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const query = interaction.options.getString('query')
    try {
      musicPlay(client, interaction, query)
    } catch (error) {
      interaction.reply({
        content: 'Song not found! :(',
        ephemeral: true
      })
      return
    }
    interaction.reply({
      content: 'Song found! :)',
      ephemeral: true
    })
  }
}
