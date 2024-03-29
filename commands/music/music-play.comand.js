const { SlashCommandBuilder } = require('discord.js')
const {
  musicPlay
} = require('../../handlers/commands/musicSystem/controllers/musicPlay')

module.exports = {
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

    if (!interaction.member.voice.channelId) {
      await interaction.reply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true
      })
      return
    }

    await interaction.reply({
      content: 'Loading...',
      ephemeral: true
    })
    try {
      const music = await musicPlay(client, interaction, query)
      if (!music) {
        await interaction.editReply({
          content: 'Your are not in the same channel',
          ephemeral: true
        })
        return
      }
    } catch (error) {
      await interaction.editReply({
        content: 'Song not found! :(',
        ephemeral: true
      })
    }
    await interaction.editReply({
      content: 'Song found! :)',
      ephemeral: true
    })
  }
}
