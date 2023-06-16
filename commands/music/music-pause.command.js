const { SlashCommandBuilder } = require('discord.js')
const {
  musicPause
} = require('../../handlers/commands/musicSystem/controllers/musicPause')
const {
  handleMusicSystemExceptions
} = require('../../handlers/commands/musicSystem/handleMusicSystemExceptions')

module.exports = {
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
    if (await handleMusicSystemExceptions(client, interaction)) {
      await interaction.reply({
        content: 'Your not inside a chanel/Nothing to pause!',
        ephemeral: true
      })
      return
    }
    const options = interaction.options.getString('options')
    switch (options) {
      case '0':
        await interaction.reply({
          content: 'Song unpaused! :)',
          ephemeral: true
        })
        break
      case '1':
        await interaction.reply({
          content: 'Song paused! :)',
          ephemeral: true
        })
        break
    }
    await musicPause(client, interaction, Boolean(+options))
  }
}
