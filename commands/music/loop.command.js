const { SlashCommandBuilder } = require('discord.js')
const {
  musicLoop
} = require('../../handlers/musicCommand/controller/musicLoop')
const { updateMusicChart } = require('../../helpers/updateMusicChart')

module.exports = {
  name: 'music-loop',
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
    const options = interaction.options.getString('options')
    musicLoop(client, interaction, +options)
    updateMusicChart(client, interaction, {})

    switch (options) {
      case '0':
        interaction.reply({
          content: 'Loop disabled',
          ephemeral: true
        })
        break
      case '1':
        interaction.reply({
          content: 'Looping song',
          ephemeral: true
        })
        break
      case '2':
        interaction.reply({
          content: 'Looping queue',
          ephemeral: true
        })
        break
    }
  }
}
