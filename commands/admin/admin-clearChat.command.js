const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear-chat')
    .setDescription('Clear the chat messages!')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Amount of messages to delete!')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const limit = interaction.options.getInteger('amount')

    await interaction.channel.bulkDelete(limit, true)

    await interaction.reply({
      content: `Deleted ${limit} messages`,
      ephemeral: true
    })
  }
}
