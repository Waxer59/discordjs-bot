const { SlashCommandBuilder } = require('discord.js')
const {
  musicShuffle
} = require('../../handlers/musicCommand/controller/musicShuflle')

module.exports = {
  name: 'music-shuffle',
  data: new SlashCommandBuilder()
    .setName('music-shuffle')
    .setDescription('Shuffle the queue!'),
  async execute(interaction, client) {
    musicShuffle(client, interaction)
  }
}
