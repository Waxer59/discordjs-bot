const { SlashCommandBuilder } = require('discord.js')
const { updateMusicChart } = require('../../helpers/music/updateMusicChart')

module.exports = {
  name: 'music-get-queue',
  data: new SlashCommandBuilder()
    .setName('music-get-queue')
    .setDescription('Get the queue!'),
  async execute(interaction, client) {
    const musicEmbed = updateMusicChart(client, interaction, {
      footer: { text: 'Current music queue' }
    })
    await interaction.reply({
      embeds: [musicEmbed],
      ephemeral: true
    })
  }
}
