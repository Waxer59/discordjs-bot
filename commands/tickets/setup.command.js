const {
  editContextParam,
  getContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ChannelType,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')

module.exports = {
  name: 'tickets-setup',
  data: new SlashCommandBuilder()
    .setName('tickets-setup')
    .setDescription('Tickets system setup command!')
    .addStringOption((option) =>
      option.setName('name').setDescription('name for your channel')
    )
    .addChannelOption((option) =>
      option
        .setName('parent')
        .setDescription('Choose a category for the channel')
        .addChannelTypes(ChannelType.GuildCategory)
    ),
  async execute(interaction, client) {
    const name = interaction.options.getString('name')
    const parent = interaction.options.getChannel('parent')

    const channel = await interaction.guild.channels.create({
      name: name ?? 'core-tickets',
      parent: parent ?? null,
      type: ChannelType.GuildText
    })

    const ticketsEmbed = new EmbedBuilder()
      .setColor('Green')
      .setDescription('**Core Tickets System**\nThis is a test description!')
      .setFooter({
        text: 'Powered by Core Discord Bot',
        iconURL: client.user.displayAvatarURL()
      })

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('open')
        .setLabel('✉️ Open a ticket')
        .setStyle(ButtonStyle.Primary)
    )

    await channel.send({ embeds: [ticketsEmbed], components: [buttons] })

    editContextParam(contextTypes().TICKET_CHANNELS, [
      ...getContextParam(contextTypes().TICKET_CHANNELS),
      {
        channelId: channel.id,
        controls: {
          open: buttons.components[0]
        }
      }
    ])

    interaction.reply({
      content: 'Channel successfully created!',
      ephemeral: true
    })
  }
}
