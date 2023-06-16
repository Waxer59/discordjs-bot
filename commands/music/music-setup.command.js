const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require('discord.js')
const { ChannelType } = require('discord.js')
const {
  getServerContextParam,
  createServerContextParam
} = require('../../context/manageContext')
const { MUSIC_CHANNEL } = require('../../context/types/contextTypes')
const { createMusicChannel } = require('../../db/services/musicChannelService')
const { btnsControls, rateLimitPerUser, DEFAULT_MUSIC_CHANNEL_NAME } = require('./music-constants')
const { getMusicChart } = require('../../helpers/music')

module.exports = {
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
    if (getServerContextParam(interaction.guild.id)?.[MUSIC_CHANNEL]) {
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
      type: ChannelType.GuildText,
      rateLimitPerUser
    })

    const musicEmbed = getMusicChart(client, {})

    const controlsMessage = await channel.send({
      embeds: [musicEmbed],
      components: [btnsControls]
    })

    createServerContextParam(interaction.guild.id, {
      [MUSIC_CHANNEL]: {
        serverId: interaction.guild.id,
        channelId: channel.id,
        controlsMessage
      }
    })
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
