const { SlashCommandBuilder } = require('discord.js')
const {
  handleMusicSystemExceptions
} = require('../../handlers/commands/musicSystem/handleMusicSystemExceptions')
const { updateMusicChart } = require('../../helpers/music')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music-clear-queue')
    .setDescription('Clear the queue!'),
  async execute(interaction, client) {
    if (await handleMusicSystemExceptions(client, interaction)) {
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
