const { updateMusicChart } = require('../../../helpers/music/updateMusicChart');

const musicPlay = async (client, interaction, query) => {
  if (
    interaction.guild.members?.me.voice.channelId !==
      interaction.member.voice.channelId &&
    interaction.guild?.members?.me?.voice?.channelId !== null
  ) {
    return false;
  }
  const guildQueue = client.player.getQueue(interaction.guild.id);
  const queue = client.player.createQueue(interaction.guild.id);

  await queue.join(interaction.member.voice.channel);
  try {
    if (query.includes('list=')) {
      await queue.playlist(query);
    } else {
      await queue.play(query);
    }
    updateMusicChart(client, interaction, {
      color: '#fb644c'
    });
  } catch (error) {
    console.log(error);
    queue.stop();
    if (!guildQueue) queue.stop();
  }

  return true;
};

module.exports = {
  musicPlay
};
