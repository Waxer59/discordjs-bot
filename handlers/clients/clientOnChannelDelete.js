const { Events } = require('discord.js')
const { getContextParam } = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const {
  handleDeleteMemberCounterChannel
} = require('../commands/memberCounterChannel/handleMemberCounterChannels')
const {
  handleMusicChannelDelete
} = require('../commands/musicCommand/handleMusicChannels')

const clientOnChannelDelete = (client) => {
  client.on(Events.ChannelDelete, async (channel) => {
    const channelId = channel.id
    //! TODO
    if (
      getContextParam(`${channel.guildId}`)?.[contextTypes().MUSIC_CHANNEL]
        ?.channelId === channelId
    ) {
      handleMusicChannelDelete(
        getContextParam(`${channel.guildId}`)[contextTypes().MUSIC_CHANNEL]
          .serverId
      )
    } else if (
      getContextParam(`${channel.guildId}`)?.[
        contextTypes().MEMBER_COUNTER_CHANNEL
      ]?.channelId === channelId
    ) {
      handleDeleteMemberCounterChannel(
        getContextParam(`${channel.guildId}`)[
          contextTypes().MEMBER_COUNTER_CHANNEL
        ].serverId
      )
    }
  })
}

module.exports = {
  clientOnChannelDelete
}
