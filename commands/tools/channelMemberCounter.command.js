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

module.exports = {
  name: 'create-member-channel-counter',
  data: new SlashCommandBuilder()
    .setName('create-member-channel-counter')
    .setDescription('Create a member channel counter!')
    .addChannelOption((option) =>
      option
        .setName('parent')
        .setDescription('Choose a category for the channel')
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    if (
      getContextParam(`${interaction.guild.id}`)?.[
        contextTypes().MEMBER_CHANNEL_COUNTER
      ]
    ) {
      await interaction.reply({
        content: 'There is already a counter channel!',
        ephemeral: true
      })
      return
    }
    const parent = interaction.options.getChannel('parent')
    const memberCounterChannelId = await interaction.guild.channels.create({
      name: `📈 | Members: ${interaction.guild.memberCount}`,
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
        [contextTypes().MEMBER_CHANNEL_COUNTER]: {
          channelId: memberCounterChannelId
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
