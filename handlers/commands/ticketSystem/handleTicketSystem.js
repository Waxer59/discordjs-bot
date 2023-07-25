const { ChannelType, PermissionsBitField } = require('discord.js')
const {
  deleteTicketSystemByServerId
} = require('../../../db/services/ticketSystemService')
const discordTranscripts = require('discord-html-transcripts')
const {
  MAX_TICKET_CHANNELS_IN_A_CATEGORY,
  MODAL_TICKET,
  TICKET_CONTROLS_COMPONENTS,
  TICKET_CONTROLS_EMBED,
  DELETE_TICKET_CONFIRMATION_COMPONENT
} = require('./ticketConstants')
const { getValue, deleteValue } = require('../../../cache/client')
const { TICKET_CHANNEL } = require('../../../cache/types/cacheTypes')

const handleSumbitTicketForm = async (interaction) => {
  const serverId = interaction.guild.id
  const ticketDescription =
    interaction.fields.getTextInputValue('description-ticket')
  const ticketSystem = await getValue(
    `${TICKET_CHANNEL}:${serverId}-${interaction.channel.id}`
  )

  const ticketChannel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`,
    parent: ticketSystem.forumCategoryId,
    type: ChannelType.GuildText,
    topic: `${interaction.user.id}-${ticketSystem.forumCategoryId}`,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [PermissionsBitField.Flags.ViewChannel]
      }
    ]
  })

  await ticketChannel.send({
    embeds: [TICKET_CONTROLS_EMBED],
    components: [TICKET_CONTROLS_COMPONENTS]
  })

  await ticketChannel.send({
    content: `**Reason for opening this ticket given by <@${interaction.user.id}>** :\n${ticketDescription}`
  })

  await interaction.reply({
    content: `**Ticket created in** ${ticketChannel}`,
    ephemeral: true
  })
}

const handleTicketSystemDelete = async (client, serverId, channel) => {
  const deletedTicketSystem = await getValue(
    `${TICKET_CHANNEL}:${serverId}-${channel.id}`
  )

  await deleteTicketSystemByServerId({
    serverId,
    channelId: deletedTicketSystem.channelId,
    forumCategoryId: deletedTicketSystem.forumCategoryId
  })

  if (channel.type === ChannelType.GuildText) {
    client.channels
      .fetch(deletedTicketSystem.forumCategoryId)
      .then((channel) => channel.delete())
      .catch(() => {})
  } else if (channel.type === ChannelType.GuildCategory) {
    client.channels
      .fetch(deletedTicketSystem.channelId)
      .then((channel) => channel.delete())
      .catch(() => {})
  }
  await deleteValue(`${TICKET_CHANNEL}:${serverId}-${channel.id}`)
}

const handleTicketButtonsInteraction = async (client, interaction, action) => {
  const serverId = interaction.guild.id
  const ticketSystem = await getValue(
    `${TICKET_CHANNEL}:${serverId}-${interaction.channel.id}`
  )

  switch (action) {
    case 'close-ticket-confirm':
      interaction.channel.delete()
      break
    case 'transcript-ticket':
      const attachment = await discordTranscripts.createTranscript(
        interaction.channel
      )
      interaction.reply({
        files: [attachment],
        ephemeral: true
      })
      break
    case 'close-ticket':
      interaction.reply({
        content: '**You are about to delete the ticket, are you sure?**',
        components: [DELETE_TICKET_CONFIRMATION_COMPONENT],
        ephemeral: true
      })
      break
    case 'open-ticket':
      if (
        client.channels.cache.get(ticketSystem?.forumCategoryId).children.cache
          .size >= MAX_TICKET_CHANNELS_IN_A_CATEGORY
      ) {
        interaction.reply({
          content:
            '**All our support channels are busy, please try again later.**',
          ephemeral: true
        })
        return
      }
      if (
        interaction.guild.channels.cache.find(
          (channel) =>
            channel.topic ===
            `${interaction.user.id}-${ticketSystem?.forumCategoryId}`
        )
      ) {
        await interaction.reply({
          content: 'You already have a ticket created',
          ephemeral: true
        })
        return
      }
      await interaction.showModal(MODAL_TICKET)
      break
  }
}

module.exports = {
  handleTicketSystemDelete,
  handleSumbitTicketForm,
  handleTicketButtonsInteraction
}
