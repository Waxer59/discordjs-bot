const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js')
const { ChannelType } = require('discord.js')
const {
  getContextParam,
  createContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')

module.exports = {
  name: 'music-setup',
  data: new SlashCommandBuilder()
    .setName('music-setup')
    .setDescription('Setup a music channel!')
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
    if (getContextParam(contextTypes().MUSIC_CHANNELS)) {
      interaction.reply({
        content: 'There is already a music channel!',
        ephemeral: true
      })
      return
    }

    const name = interaction.options.getString('name')
    const parent = interaction.options.getChannel('parent')

    const channel = await interaction.guild.channels.create({
      name: name ?? 'music',
      parent: parent ?? null,
      type: ChannelType.GuildText
    })

    const btnsControls = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('pause')
        .setLabel('⏯️')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('⏩')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('stop')
        .setLabel('⏹️')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('repeat')
        .setDisabled(false)
        .setLabel('🔄️')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('shuffle')
        .setLabel('🔀')
        .setDisabled(false)
        .setStyle(ButtonStyle.Secondary)
    )

    const musicEmbed = new EmbedBuilder()
      .setDescription('**No song playing currently.**')
      .setColor('Purple')
      .setFooter({
        text: 'Here will appear the url of the song!',
        iconURL: client.user.displayAvatarURL()
      })
      .setImage(
        'https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'
      )

    const controlsMessage = await channel.send({
      embeds: [musicEmbed],
      components: [btnsControls]
    })

    createContextParam(contextTypes().MUSIC_CHANNELS, {
      channelId: channel.id,
      controlsMessage,
      controls: {
        pause: btnsControls.components[0],
        next: btnsControls.components[1],
        stop: btnsControls.components[2],
        repeat: btnsControls.components[3],
        shuffle: btnsControls.components[4]
      }
    })

    interaction.reply({
      content: 'Channel successfully created!',
      ephemeral: true
    })
  }
}
