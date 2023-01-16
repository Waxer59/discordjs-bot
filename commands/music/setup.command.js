const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')
const { ChannelType } = require('discord.js')
const {
  createContextParam,
  getContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')

module.exports = {
  name: 'setup',
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup a music channel!')
    .addStringOption((option) =>
      option.setName('name').setDescription('name for your channel')
    )
    .addChannelOption((option) =>
      option
        .setName('parent')
        .setDescription('Choose a category for the channel')
    ),
  async execute(interaction, client) {
    const name = interaction.options.getString('name')
    const parent = interaction.options.getChannel('parent')

    if (parent !== ChannelType.GuildCategory && parent !== null) {
      interaction.reply({
        content: 'Parent must be a category!',
        ephemeral: true
      })
      return
    }

    const channel = await interaction.guild.channels.create({
      name: name ?? 'music',
      parent: parent ?? null,
      type: ChannelType.GuildText
    })

    const btnsControls = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('⏩')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('pause')
        .setLabel('⏯️')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('stop')
        .setLabel('⏹️')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('repeat')
        .setLabel('🔄️')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('shuffle')
        .setLabel('🔀')
        .setStyle(ButtonStyle.Secondary)
    )

    const playListButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('addToPlaylist')
        .setLabel('Add to Playlist')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('removeFromPlaylist')
        .setLabel('Remove from Playlist')
        .setStyle(ButtonStyle.Danger)
    )

    const musicEmbed = new EmbedBuilder()
      .setDescription('**No song playing currently.**')
      .setColor('Purple')
      .setFooter({
        text: 'Powered by Core Discord Bot',
        iconURL: client.user.displayAvatarURL()
      })
      .setImage(
        'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'
      )

    channel.send({
      embeds: [musicEmbed],
      components: [btnsControls, playListButtons]
    })

    createContextParam(
      contextTypes().MUSIC_CHANNELS,
      [...getContextParam(contextTypes().MUSIC_CHANNELS), channel.id],
      {
        override: true
      }
    )

    interaction.reply({
      content: 'Channel successfully created!',
      ephemeral: true
    })
  }
}
