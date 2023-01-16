const { SlashCommandBuilder } = require('discord.js')
const { ChannelType } = require('discord.js')

module.exports = {
  name: 'setup',
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('setup a music channel!')
    .addStringOption((option) =>
      option.setName('name').setDescription('name for your channel')
    ),
  async execute(interaction, client) {
    const name = interaction.options.getString('name')
    const channel = await interaction.guild.channels.create({
      name: name ?? 'music',
      type: ChannelType.GuildText
    })
    channel.send('context')
  }
}
