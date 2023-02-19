const {
  ChannelType,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js')
const {
  getContextParam,
  editContextParam
} = require('../../../context/manageContext')
const { TICKET_CHANNEL } = require('../../../context/types/contextTypes')
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
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId('transcript-ticket')
    .setLabel('📜 Transcript')
    .setDisabled(false)
    .setStyle(ButtonStyle.Primary)
)

const TICKET_DESCRIPTION = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setCustomId('description-ticket')
    .setLabel('Describe your ticket')
    .setPlaceholder('Describe in a few words the reason for your ticket')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
)

const MODAL_TICKET = new ModalBuilder()
  .setCustomId('form-ticket')
  .setTitle('New ticket')
  .addComponents(TICKET_DESCRIPTION)

const MAX_TICKET_CHANNELS_IN_A_CATEGORY = 50

const handleTicketSystemButtons = async (client, interaction) => {
  const buttonId = interaction.customId
  const serverId = interaction.guild.id

  switch (buttonId) {
    case 'open-ticket':
      if (
        client.channels.cache.get(
          getContextParam(serverId)[TICKET_CHANNEL].find(
            (el) => el.channelId === interaction.channel.id
          ).forumCategoryId
        ).children.cache.size >= MAX_TICKET_CHANNELS_IN_A_CATEGORY
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
            `${interaction.user.id}-${
              getContextParam(serverId)[TICKET_CHANNEL].find(
                (el) => el.channelId === interaction.channel.id
              ).forumCategoryId
            }`
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

const handleSumbitTicketForm = async (interaction) => {
  const serverId = interaction.guild.id
  const ticketDescription =
    interaction.fields.getTextInputValue('description-ticket')
  const ticketSystem = getContextParam(serverId)[TICKET_CHANNEL].find(
    (el) => el.channelId === interaction.channel.id
  )

  const ticketChannel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}-${interaction.user.discriminator}`,
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
    embeds: [DELETE_TICKET_EMBED],
    components: [DELETE_TICKET_COMPONENTS]
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
  const deletedTicketSystem = getContextParam(serverId)[TICKET_CHANNEL].find(
    (el) =>
      channel.type === ChannelType.GuildText
        ? el.channelId
        : el.forumCategoryId === channel.id
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

  editContextParam(
    serverId,
    TICKET_CHANNEL,
    getContextParam(serverId)?.[TICKET_CHANNEL].filter(
      (el) => el.channelId !== channel.id
    )
  )
}

module.exports = {
  handleTicketSystemButtons,
  handleTicketSystemDelete,
  handleSumbitTicketForm
}
