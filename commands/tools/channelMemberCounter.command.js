const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const DEFAULT_CHANNEL_NAME = "member counter"

module.exports = {
  name: 'create-member-channel-counter',
  data: new SlashCommandBuilder()
    .setName('create-member-channel-counter')
    .setDescription('Create a member channel counter!')
    .addStringOption((option) =>
      option.setName('name').setDescription('Channel name')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const channelName = interaction.options.getString('name') ?? DEFAULT_CHANNEL_NAME
    console.log(channelName)
    await interaction.reply('Pong!')
  }
}
