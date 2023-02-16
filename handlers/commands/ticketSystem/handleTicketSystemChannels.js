const { ChannelType, PermissionsBitField } = require('discord.js')
const {
  getContextParam,
  removeContextParam
} = require('../../../context/manageContext')
const { contextTypes } = require('../../../context/types/contextTypes')
const {
  deleteTicketSystemByServerId
} = require('../../../db/services/ticketSystemService')

const handleTickeSystemButtons = async (client, interaction) => {
  const buttonId = interaction.customId
  const serverId = interaction.guild.id

  switch (buttonId) {
    case 'ticket':
      await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}-${interaction.user.discriminator}`,
        parent:
          getContextParam(serverId)[contextTypes().TICKET_CHANNEL]
            .forumCategoryId,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
          }
        ]
      })
      break
  }
  interaction.update({ content: '' })
}

const handleTicketSystemDelete = async (client, serverId, channel) => {
  await deleteTicketSystemByServerId(serverId)
  if (!channel.type) {
    client.channels
      .fetch(
        getContextParam(serverId)[contextTypes().TICKET_CHANNEL].forumCategoryId
      )
      .then((channel) => channel.delete())
  } else {
    client.channels
      .fetch(getContextParam(serverId)[contextTypes().TICKET_CHANNEL].channelId)
      .then((channel) => channel.delete())
  }

  removeContextParam(serverId, contextTypes().TICKET_CHANNEL)
}

module.exports = {
  handleTickeSystemButtons,
  handleTicketSystemDelete
}
