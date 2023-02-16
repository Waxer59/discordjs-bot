const { SlashCommandBuilder } = require('discord.js')
const {
  handleMusicExceptions
} = require('../../handlers/commands/musicCommand/handleMusicExceptions')
const { updateMusicChart } = require('../../helpers/music/updateMusicChart')

module.exports = {
  name: 'music-clear-queue',
  data: new SlashCommandBuilder()
    .setName('music-clear-queue')
    .setDescription('Clear the queue!'),
  async execute(interaction, client) {
    if (await handleMusicExceptions(client, interaction)) {
      await interaction.reply({
        content: 'Your not inside a chanel/Nothing to clear!',
        ephemeral: true
      })
      return
    }
    const guildQueue = client.player.getQueue(interaction.guild.id)
    guildQueue.clearQueue()
    updateMusicChart(client, interaction, {})
    await interaction.reply({
      content: 'Queue cleared!',
      ephemeral: true
    })
  }
}
