const {
  ChannelType,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')
const {
  getContextParam,
  removeContextParam
} = require('../../../context/manageContext')
const { contextTypes } = require('../../../context/types/contextTypes')
const {
  deleteTicketSystemByServerId
} = require('../../../db/services/ticketSystemService')

const DELETE_TICKET_EMBED = new EmbedBuilder()
  .setTitle('**Close Ticket**')
  .setDescription('Close the ticket by clicking the button bellow!')
  .setColor('Red')

const DELETE_TICKET_COMPONENTS = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('close-ticket')
    .setLabel('🔒 Close')
    .setDisabled(false)
    .setStyle(ButtonStyle.Secondary)
)

const handleTicketSystemButtons = async (client, interaction) => {
  const buttonId = interaction.customId
  const serverId = interaction.guild.id

  switch (buttonId) {
    case 'ticket':
      if (
        interaction.guild.channels.cache.find(
          (channel) => channel.topic === interaction.user.id
        )
      ) {
        await interaction.reply({
          content: 'You already have a ticket created',
          ephemeral: true
        })
        return
      }
      const ticketChannel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}-${interaction.user.discriminator}`,
        parent:
          getContextParam(serverId)[contextTypes().TICKET_CHANNEL]
            .forumCategoryId,
        type: ChannelType.GuildText,
        topic: interaction.user.id,
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
        embeds: [DELETE_TICKET_EMBED],
        components: [DELETE_TICKET_COMPONENTS],
        content: `Welcome <@${interaction.user.id}>`
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
  handleTicketSystemButtons,
  handleTicketSystemDelete
}