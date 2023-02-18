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
  createContextParam,
  pushContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const { createTicketSystem } = require('../../db/services/ticketSystemService')
const DEFAULT_TICKET_SYSTEM_NAME = '📌 Ticket system'
const DEFAULT_TICKET_SYSTEM_DESCRIPTION =
  'Click the button below to create a new ticket!'
const DEFAULT_TICKET_SYSTEM_COLOR = 'Purple'

module.exports = {
  name: 'ticket-setup',
  data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Setup the ticket system for your server!')
    .addStringOption((option) =>
      option.setName('name').setDescription('Name for your ticket system')
    )
    .addChannelOption((option) =>
      option
        .setName('parent-category')
        .setDescription('Choose a category for the channel')
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('Describe your ticket systen!')
    )
    .addStringOption((option) =>
      option
        .setName('embed-color')
        .setDescription('Color of your ticket system embed')
        .addChoices(
          { name: 'Blue', value: '#0000FF' },
          { name: 'Red', value: '#FF0000' },
          { name: 'Green', value: '#00FF00' },
          { name: 'Yellow', value: '#FFFF00' },
          { name: 'Orange', value: '#FFA500' },
          { name: 'Purple', value: '#800080' },
          { name: 'White', value: '#FFFFFF' },
          { name: 'Black', value: '#000000' }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const name =
      interaction.options.getString('name') ?? DEFAULT_TICKET_SYSTEM_NAME
    const parent = interaction.options.getChannel('parent') ?? null
    const description =
      interaction.options.getString('description') ??
      DEFAULT_TICKET_SYSTEM_DESCRIPTION
    const embedColor =
      interaction.options.getString('embed-color') ??
      DEFAULT_TICKET_SYSTEM_COLOR

    const channel = await interaction.guild.channels.create({
      name,
      parent,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.SendMessages]
        }
      ]
    })

    const forumCategory = await interaction.guild.channels.create({
      name,
      type: ChannelType.GuildCategory
    })

    const btnsControls = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('open-ticket')
        .setLabel('📩 Open ticket')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary)
    )

    const ticketEmbed = new EmbedBuilder()
      .setTitle(`**${name}**`)
      .setDescription(description)
      .setColor(embedColor)

    const controlsMessage = await channel.send({
      embeds: [ticketEmbed],
      components: [btnsControls]
    })

    if (
      getContextParam(`${interaction.guild.id}`)?.[
        contextTypes().TICKET_CHANNEL
      ]
    ) {
      pushContextParam(
        `${interaction.guild.id}`,
        contextTypes().TICKET_CHANNEL,
        {
          serverId: interaction.guild.id,
          channelId: channel.id,
          forumCategoryId: `${forumCategory}`.replace(/[^0-9]/g, ''),
          controlsMessage
        }
      )
    } else {
      createContextParam(
        `${interaction.guild.id}`,
        {
          [contextTypes().TICKET_CHANNEL]: [
            {
              serverId: interaction.guild.id,
              channelId: channel.id,
              forumCategoryId: `${forumCategory}`.replace(/[^0-9]/g, ''),
              controlsMessage
            }
          ]
        },
        {
          override: true
        }
      )
    }

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
