const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');
const {
  getContextParam,
  createContextParam
} = require('../../context/manageContext');
const { contextTypes } = require('../../context/types/contextTypes');
const {
  createTicketChannel
} = require('../../db/services/ticketChannelService');

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
      getContextParam(
        `${interaction.guild.id}_${contextTypes().TICKET_CHANNELS}`
      )
    ) {
      await interaction.reply({
        content: 'There is already a ticket channel!',
        ephemeral: true
      });
      return;
    }

    const name = interaction.options.getString('name');
    const parent = interaction.options.getChannel('parent');

    const channel = await interaction.guild.channels.create({
      name: name ?? 'tickets',
      parent: parent ?? null,
      type: ChannelType.GuildText
    });

    const btnsControls = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket')
        .setLabel('Open ticket')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary)
    );

    const ticketEmbed = new EmbedBuilder()
      .setDescription('**Tickets**\nClick the button below to open a ticket!')
      .setColor('Blurple');

    const controlsMessage = await channel.send({
      embeds: [ticketEmbed],
      components: [btnsControls]
    });

    createContextParam(
      `${interaction.guild.id}_${contextTypes().TICKET_CHANNELS}`,
      {
        serverId: interaction.guild.id,
        channelId: channel.id,
        controlsMessage
      }
    );

    await createTicketChannel({
      serverId: interaction.guild.id,
      channelId: channel.id,
      controlsMessageId: controlsMessage.id
    });

    await interaction.reply({
      content: 'Channel successfully created!',
      ephemeral: true
    });
  }
};
