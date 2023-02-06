const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  name: 'clear-chat',
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
    ),
  async execute(interaction, client) {
    const limit = interaction.options.getInteger('amount')

    await interaction.channel.bulkDelete(limit)

    await interaction.reply({
        content: `Deleted ${limit} messages`,
        ephemeral: true
    })
  }
}
