const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  name: 'music',
  data: new SlashCommandBuilder()
    .setName('music')
    .setDescription('Play a song!')
    .addStringOption((option) =>
      option.setName('url').setDescription('url of the song').setRequired(true)
    ),
  async execute(interaction, client) {
    const url = interaction.options.getString('url')

    const queue = client.player.createQueue(interaction.guild.id)
    await queue.join(interaction.member.voice.channel)
    await queue.play(url).catch((err) => {
      console.log(err)
      if (!guildQueue) queue.stop()
    })
  }
}
