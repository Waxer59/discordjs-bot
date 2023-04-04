const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  PermissionsBitField
} = require('discord.js')
const {
  getServerContextParam,
  createServerContextParam,
  editServerContextParam
} = require('../../context/manageContext')
const { TICKET_CHANNEL } = require('../../context/types/contextTypes')
const { createTicketSystem } = require('../../db/services/ticketSystemService')
const {
  DEFAULT_TICKET_SYSTEM_NAME,
  DEFAULT_TICKET_SYSTEM_COLOR,
  DEFAULT_TICKET_SYSTEM_DESCRIPTION,
  btnsControls
} = require('./constants/tools-ticket-constants')

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
    const parent = interaction.options.getChannel('parent-category')
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

    const ticketEmbed = new EmbedBuilder()
      .setTitle(`**${name}**`)
      .setDescription(description)
      .setColor(embedColor)

    const controlsMessage = await channel.send({
      embeds: [ticketEmbed],
      components: [btnsControls]
    })

    if (getServerContextParam(interaction.guild.id)?.[TICKET_CHANNEL]) {
      editServerContextParam(interaction.guild.id, TICKET_CHANNEL, [
        ...getServerContextParam(interaction.guild.id)[TICKET_CHANNEL],
        {
          serverId: interaction.guild.id,
          channelId: channel.id,
          forumCategoryId: `${forumCategory}`.replace(/[^0-9]/g, ''),
          controlsMessage
        }
      ])
    } else {
      createServerContextParam(interaction.guild.id, {
        [TICKET_CHANNEL]: [
          {
            serverId: interaction.guild.id,
            channelId: channel.id,
            forumCategoryId: `${forumCategory}`.replace(/[^0-9]/g, ''),
            controlsMessage
          }
        ]
      })
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
