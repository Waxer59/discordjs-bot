const { SlashCommandBuilder } = require('discord.js')
const { updateMusicChart } = require('../../helpers/music')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music-get-queue')
    .setDescription('Get the queue!'),
  async execute(interaction, client) {
    const musicEmbed = await updateMusicChart(client, interaction, {
      footer: { text: 'Current music queue' }
    })
    await interaction.reply({
      embeds: [musicEmbed],
      ephemeral: true
    })
  }
}
