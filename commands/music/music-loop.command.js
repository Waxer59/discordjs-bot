const { SlashCommandBuilder } = require('discord.js')
const {
  musicLoop
} = require('../../handlers/commands/musicSystem/controllers/musicLoop')
const {
  handleMusicExceptions
} = require('../../handlers/commands/musicSystem/handleMusicSystemExceptions')
const { updateMusicChart } = require('../../helpers/music')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music-loop')
    .setDescription('Loop your queue!')
    .addStringOption((option) =>
      option
        .setName('options')
        .setDescription('Loop options')
        .setRequired(true)
        .addChoices(
          { name: 'Disabled', value: '0' },
          { name: 'Repeat song', value: '1' },
          { name: 'Repeat queue', value: '2' }
        )
    ),
  async execute(interaction, client) {
    if (await handleMusicExceptions(client, interaction)) {
      await interaction.reply({
        content: 'Your not inside a chanel/Nothing to loop!',
        ephemeral: true
      })
      return
    }
    const options = interaction.options.getString('options')
    musicLoop(client, interaction, +options)
    updateMusicChart(client, interaction, {})

    switch (options) {
      case '0':
        await interaction.reply({
          content: 'Loop disabled',
          ephemeral: true
        })
        break
      case '1':
        await interaction.reply({
          content: 'Looping song',
          ephemeral: true
        })
        break
      case '2':
        await interaction.reply({
          content: 'Looping queue',
          ephemeral: true
        })
        break
    }
  }
}
