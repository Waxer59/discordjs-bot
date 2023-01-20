const { SlashCommandBuilder } = require('discord.js')
const { updateMusicChart } = require('../../helpers/updateMusicChart')

module.exports = {
  name: 'music-clear-queue',
  data: new SlashCommandBuilder()
    .setName('music-clear-queue')
    .setDescription('Clear the queue!'),
  async execute(interaction, client) {
    const guildQueue = client.player.getQueue(message.guild.id)
    guildQueue.clearQueue()
    updateMusicChart(client, interaction, {})
    interaction.reply({
      content: 'Queue cleared!',
      ephemeral: true
    })
  }
}
