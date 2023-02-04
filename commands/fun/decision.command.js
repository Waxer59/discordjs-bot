const { SlashCommandBuilder } = require('discord.js')
const decisionsAlternatives = [
  'Absolutely not',
  'No',
  'Maybe',
  'Not sure',
  'Yes!',
  'Absolutely yes!',
  'Likely',
  'Unlikely',
  'Very likely',
  'Not likely',
  'Possible',
  'Improbable',
  'Never',
  'Impossible',
  'Certainly',
  'Definitely not',
  "I'm certain",
  "I'm not certain"
]

module.exports = {
  name: 'decision',
  data: new SlashCommandBuilder()
    .setName('decision')
    .setDescription('Make a decision now!'),
  async execute(interaction, client) {
    await interaction.reply(
      decisionsAlternatives[
        Math.floor(Math.random() * decisionsAlternatives.length)
      ]
    )
  }
}
