const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  name: 'play',
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song!')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('Name or URL of the song')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const url = interaction.options.getString('query')

    const queue = client.player.createQueue(interaction.guild.id)
    await queue.join(interaction.member.voice.channel)
    await queue.play(url).catch((err) => {
      console.log(err)
      if (!guildQueue) queue.stop()
    })
  }
}
