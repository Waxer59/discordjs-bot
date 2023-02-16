const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  PermissionsBitField
} = require('discord.js')
const {
  editContextParam,
  getAllContext,
  getContextParam
} = require('../../context/manageContext')
const { contextTypes } = require('../../context/types/contextTypes')
const DEFAULT_CHANNEL_NAME = '📈 | Members:'

module.exports = {
  name: 'create-member-channel-counter',
  data: new SlashCommandBuilder()
    .setName('create-member-counter-channel')
    .setDescription('Create a member counter channel!')
    .addChannelOption((option) =>
      option
        .setName('parent')
        .setDescription('Choose a category for the channel')
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addStringOption((option) =>
      option.setName('name').setDescription('Channel name!')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    if (
      getContextParam(`${interaction.guild.id}`)?.[
        contextTypes().MEMBER_COUNTER_CHANNEL
      ]
    ) {
      await interaction.reply({
        content: 'There is already a counter channel!',
        ephemeral: true
      })
      return
    }
    const parent = interaction.options.getChannel('parent')
    const channelName =
      interaction.options.getString('name') ?? DEFAULT_CHANNEL_NAME

    const memberCounterChannelId = await interaction.guild.channels.create({
      name: `${channelName} ${interaction.guild.memberCount}`,
      parent: parent ?? null,
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.Connect]
        }
      ]
    })
    editContextParam(
      `${interaction.guild.id}`,
      {
        [contextTypes().MEMBER_COUNTER_CHANNEL]: {
          channelId: memberCounterChannelId,
          channelName
        }
      },
      {
        override: true
      }
    )
    console.log(getAllContext())
    await interaction.reply({ content: 'Channel created!', ephemeral: true })
  }
}
