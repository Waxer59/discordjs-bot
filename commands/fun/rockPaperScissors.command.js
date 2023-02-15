const { SlashCommandBuilder } = require('discord.js');
const rockPaperScissors = ['Rock! 🪨', 'Paper! 📜', 'Scissors! ✂️'];

module.exports = {
  name: 'rock-paper-scissors',
  data: new SlashCommandBuilder()
    .setName('rock-paper-scissors')
    .setDescription('Play rock, paper, scissors!'),
  async execute(interaction, client) {
    await interaction.reply(
      rockPaperScissors[Math.floor(Math.random() * rockPaperScissors.length)]
    );
  }
};
