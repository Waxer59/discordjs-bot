const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require('discord.js')
const { ChannelType } = require('discord.js')
const {
  getContextParam,
  createContextParam
} = require('../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../context/types/contextTypes')
const { createMusicChannel } = require('../../db/services/musicChannelService')
const { updateMusicChart } = require('../../helpers/music/updateMusicChart')
const DEFAULT_MUSIC_CHANNEL_NAME = '🎶 Music'

module.exports = {
  name: 'music-setup',
  data: new SlashCommandBuilder()
    .setName('music-setup')
    .setDescription('Setup a music channel!')
    .addStringOption((option) =>
      option.setName('channel-name').setDescription('Name for your channel')
    )
    .addChannelOption((option) =>
      option
        .setName('parent-category')
        .setDescription('Choose a category for the channel')
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    if (getContextParam(`${interaction.guild.id}`)?.[MUSIC_CHANNEL]) {
      await interaction.reply({
        content: 'There is already a music channel!',
        ephemeral: true
      })
      return
    }

    const name =
      interaction.options.getString('name') ?? DEFAULT_MUSIC_CHANNEL_NAME
    const parent = interaction.options.getChannel('parent-category') ?? null

    const channel = await interaction.guild.channels.create({
      name,
      parent,
      type: ChannelType.GuildText
    })

    const btnsControls = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('pause')
        .setLabel('⏯️')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('skip')
        .setLabel('⏩')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('stop')
        .setLabel('⏹️')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('loop')
        .setDisabled(false)
        .setLabel('🔄️')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('shuffle')
        .setLabel('🔀')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary)
    )

    const musicEmbed = await updateMusicChart(client, interaction, {})

    const controlsMessage = await channel.send({
      embeds: [musicEmbed],
      components: [btnsControls]
    })

    createContextParam(
      `${interaction.guild.id}`,
      {
        [MUSIC_CHANNEL]: {
          serverId: interaction.guild.id,
          channelId: channel.id,
          controlsMessage
        }
      },
      {
        override: true
      }
    )
    await createMusicChannel({
      serverId: interaction.guild.id,
      channelId: channel.id,
      controlsMessageId: controlsMessage.id
    })

    await interaction.reply({
      content: 'Channel successfully created!',
      ephemeral: true
    })
  }
}
