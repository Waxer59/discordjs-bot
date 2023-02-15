const handleMusicExceptions = async (client, interaction) => {
  const guildQueue = client.player.getQueue(interaction.guild.id);
  const songsQueue = guildQueue?.songs ?? [];
  if (songsQueue.length < 1) {
    return true;
  }

  if (
    interaction.guild.members?.me.voice.channelId !==
    interaction.member.voice.channelId
  ) {
    return true;
  }

  return false;
};

module.exports = {
  handleMusicExceptions
};
