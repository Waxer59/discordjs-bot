const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'roll',
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Gives a number between 1 and 6')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('Provide an user to roll with!')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');

    if (user) {
      await interaction.reply({
        content: `🎲 You just got a **${
          Math.floor(Math.random() * 6) + 1
        }**, your friend <@${user.id}> just got a **${
          Math.floor(Math.random() * 6) + 1
        }**!`
      });
      return;
    }

    await interaction.reply({
      content: `🎲 You just got a ${Math.floor(Math.random() * 6) + 1}!`
    });
  }
};
