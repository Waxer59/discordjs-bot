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
const {
  MAX_OPTION_CHARS,
  DEFAULT_POLL_COLOR,
  MAX_TIME,
  MIN_TIME,
  MINUTES_TO_MILISECONDS
} = require('./constants/tools-poll-constants')
const { deleteValue, setValue } = require('../../cache/client')
const { POLL } = require('../../cache/prefixes/cachePrefixes')

module.exports = {
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
        .setName('description')
        .setDescription('Description of the poll')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('expires_at')
        .setDescription('Time in MINUTES in which the poll closes')
        .setRequired(true)
        .setMaxValue(MAX_TIME)
        .setMinValue(MIN_TIME)
    )
    .addStringOption((option) =>
      option
        .setName('option-c')
        .setDescription('Poll option')
        .setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option
        .setName('option-d')
        .setDescription('Poll option')
        .setMaxLength(MAX_OPTION_CHARS)
    )
    .addStringOption((option) =>
      option
        .setName('option-e')
        .setDescription('Poll option')
        .setMaxLength(MAX_OPTION_CHARS)
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
    const expiresAt = interaction.options.getInteger('expires_at') // <-- Minutes
    const actualDate = new Date()
    const endPollDate = new Date(
      actualDate.getTime() + expiresAt * MINUTES_TO_MILISECONDS
    )

    const optionA = interaction.options.getString('option-a')
    const optionB = interaction.options.getString('option-b')
    const optionC = interaction.options.getString('option-c')
    const optionD = interaction.options.getString('option-d')
    const optionE = interaction.options.getString('option-e')

    const optionsArr = [optionA, optionB, optionC, optionD, optionE].filter(
      (el) => el
    )

    if ([...new Set(optionsArr)].length !== optionsArr.length) {
      await interaction.reply({
        content: 'You cannot have the same option twice!',
        ephemeral: true
      })
      return
    }

    const optionsJSON = optionsArr.reduce((obj, option) => {
      const optionObj = JSON.parse(`{"${option}": { "votes": [] }}`)
      return { ...obj, ...optionObj }
    }, {})

    const embed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle(title)
      .setDescription(description)
      .addFields(
        ...optionsArr.map((el) => {
          return {
            name: el + ' | 0',
            value: '🟦',
            inline: true
          }
        })
      )
      .setFooter({
        text: `This poll ends on ${endPollDate.toLocaleString()}`,
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

    const message = await channel.send({
      embeds: [embed],
      components: [btns]
    })

    const pollId = message.id

    setTimeout(async () => {
      try {
        message.edit({ components: [] })
        await deleteValue(`${POLL}:${pollId}`)
      } catch (error) {}
    }, expiresAt * MINUTES_TO_MILISECONDS) // <-- Miliseconds

    await setValue(`${POLL}:${pollId}`, {
      id: pollId,
      options: optionsJSON,
      totalVotes: 0
    })

    await interaction.reply({
      ephemeral: true,
      content: 'Poll created!'
    })
  }
}
