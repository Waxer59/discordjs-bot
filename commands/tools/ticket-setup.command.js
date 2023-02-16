const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionsBitField
} = require('discord.js')
const {
  getContextParam,
  createContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const { createTicketSystem } = require('../../db/services/ticketSystemService')
const DEFAULT_CHANNEL_NAME = '📌 Ticket system'

module.exports = {
  name: 'ticket-setup',
  data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Setup the ticket system for your server!')
    .addStringOption((option) =>
      option.setName('name').setDescription('name for your channel')
    )
    .addChannelOption((option) =>
      option
        .setName('parent')
        .setDescription('Choose a category for the channel')
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    if (
      getContextParam(`${interaction.guild.id}`)?.[
        contextTypes().TICKET_CHANNEL
      ]
    ) {
      await interaction.reply({
        content: 'There is already a ticket channel!',
        ephemeral: true
      })
      return
    }

    const name = interaction.options.getString('name')
    const parent = interaction.options.getChannel('parent')

    const channel = await interaction.guild.channels.create({
      name: name ?? DEFAULT_CHANNEL_NAME,
      parent: parent ?? null,
      type: ChannelType.GuildText
    })

    const forumCategory = await interaction.guild.channels.create({
      name: name ?? DEFAULT_CHANNEL_NAME,
      parent: parent ?? null,
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          deny: [PermissionsBitField.Flags.SendMessages]
        }
      ]
    })

    const btnsControls = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket')
        .setLabel('Open ticket')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary)
    )

    const ticketEmbed = new EmbedBuilder()
      .setDescription('**Tickets**\nClick the button below to open a ticket!')
      .setColor('Purple')

    const controlsMessage = await channel.send({
      embeds: [ticketEmbed],
      components: [btnsControls]
    })

    createContextParam(
      `${interaction.guild.id}`,
      {
        [contextTypes().TICKET_CHANNEL]: {
          serverId: interaction.guild.id,
          channelId: channel.id,
          forumCategoryId: `${forumCategory}`.replace(/[^0-9]/g, ''),
          controlsMessage
        }
      },
      {
        override: true
      }
    )

    await createTicketSystem({
      serverId: interaction.guild.id,
      channelId: channel.id,
      forumCategoryId: `${forumCategory}`.replace(/[^0-9]/g, ''),
      controlsMessageId: controlsMessage.id
    })

    await interaction.reply({
      content: 'Channel successfully created!',
      ephemeral: true
    })
  }
}
