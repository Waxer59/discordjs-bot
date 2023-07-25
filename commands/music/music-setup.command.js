const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { ChannelType } = require('discord.js')
const { createMusicChannel } = require('../../db/services/musicChannelService')
const {
  btnsControls,
  rateLimitPerUser,
  DEFAULT_MUSIC_CHANNEL_NAME
} = require('./music-constants')
const { getMusicChart } = require('../../helpers/music')
const { getValue, setValue } = require('../../cache/client')
const { MUSIC_CHANNEL } = require('../../cache/types/cacheTypes')

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
    const musicChannel = await getValue(
      `${MUSIC_CHANNEL}L:${interaction.guild.id}`
    )
    if (musicChannel) {
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

    await setValue(`${MUSIC_CHANNEL}:${interaction.guild.id}`, {
      serverId: interaction.guild.id,
      channelId: channel.id,
      controlsMessageId: controlsMessage.id
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
