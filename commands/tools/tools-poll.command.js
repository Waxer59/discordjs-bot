const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js')
const { v4: uuidv4 } = require('uuid')

const DEFAULT_POLL_COLOR = 'Purple'
const MAX_OPTION_CHARS = 55

module.exports = {
  name: 'poll',
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll!')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('Title of the poll')
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Channel to send the poll')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('option-a')
        .setDescription('Poll option')
        .setRequired(true)
        .setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option
        .setName('option-b')
        .setDescription('Poll option')
        .setRequired(true)
        .setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option
        .setName('votes-mode')
        .setDescription('How do you want the votes to be shown?')
        .addChoices(
          { name: 'Show number of votes ', value: 'show' },
          { name: 'Hide number of votes', value: 'hide' }
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('Description of the poll')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('option-c').setDescription('Poll option').setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option.setName('option-d').setDescription('Poll option').setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option.setName('option-e').setDescription('Poll option').setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option
        .setName('embed-color')
        .setDescription('Color of your poll embed')
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
    const title = interaction.options.getString('title')
    const embedColor =
      interaction.options.getString('embed-color') ?? DEFAULT_POLL_COLOR
    const description = interaction.options.getString('description')
    const channel = interaction.options.getChannel('channel')
    // const votesMode = interaction.options.getString('votes-mode') // TODO: create votes mode

    const optionA = interaction.options.getString('option-a')
    const optionB = interaction.options.getString('option-b')
    const optionC = interaction.options.getString('option-c')
    const optionD = interaction.options.getString('option-d')
    const optionE = interaction.options.getString('option-e')

    const pollId = uuidv4()

    const optionsArr = [optionA, optionB, optionC, optionD, optionE].filter(
      (el) => el
    )

    const embed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle(title)
      .setDescription(description)
      .addFields(
        ...optionsArr.map((el) => {
          return {
            name: el,
            value: '🟦',
            inline: true
          }
        })
      )
      .setFooter({
        text: pollId,
        iconURL: client.user.displayAvatarURL()
      })

    const btns = new ActionRowBuilder().addComponents(
      ...optionsArr.map((el) =>
        new ButtonBuilder()
          .setCustomId(`poll:${uuidv4()}-${el}`)
          .setLabel(el)
          .setDisabled(false)
          .setStyle(ButtonStyle.Secondary)
      )
    )

    await channel.send({
      embeds: [embed],
      components: [btns]
    })

    await interaction.reply({
      ephemeral: true,
      content: 'Poll created!'
    })
  }
}
