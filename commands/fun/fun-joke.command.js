const { SlashCommandBuilder } = require('discord.js')
const { randomJoke } = require('just-jokes')

module.exports = {
  name: 'joke',
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Tell a joke!'),
  async execute(interaction, client) {
    const { setup, punchline } = randomJoke()
    await interaction.reply(setup + '\n' + punchline)
  }
}
