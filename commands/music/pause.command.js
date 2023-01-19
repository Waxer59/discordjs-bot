const { SlashCommandBuilder } = require('discord.js')
const {
  musicPause
} = require('../../handlers/musicCommand/controller/musicPause')

module.exports = {
  name: 'music-pause',
  data: new SlashCommandBuilder()
    .setName('music-pause')
    .setDescription('Pause a song!')
    .addStringOption((option) =>
      option
        .setName('options')
        .setDescription('Pause options')
        .setRequired(true)
        .addChoices(
          { name: 'Pause', value: '1' },
          { name: 'Unpause', value: '0' }
        )
    ),
  async execute(interaction, client) {
    const options = interaction.options.getString('options')
    switch (options) {
      case '0':
        interaction.reply({
          content: 'Song unpaused! :)',
          ephemeral: true
        })
        break
      case '1':
        interaction.reply({
          content: 'Song paused! :)',
          ephemeral: true
        })
        break
    }
    musicPause(client, interaction, Boolean(+options))
  }
}
