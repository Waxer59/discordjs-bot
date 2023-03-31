const { EmbedBuilder } = require('discord.js')
const {
  getServerContextParam,
  editServerContextParam
} = require('../../../context/manageContext')
const { POLL } = require('../../../context/types/contextTypes')

const handlePollButtonsInteraction = async (client, interaction, buttonId) => {
  const option = buttonId.split('-').reverse()[0]
  const serverId = interaction.guild.id
  const userId = interaction.user.id
  const channelId = interaction.channelId
  const messageId = interaction.message.id
  const channel = client.channels.cache.get(channelId)
  const message = await channel.messages.fetch(messageId)
  const pollId = message.id

  const poll = getServerContextParam(serverId)[POLL].find(
    (el) => el.id === pollId
  )
  const userOtherVote = findIdInVotes(userId, poll.options)

  if (poll.options[option].votes.includes(userId)) {
    await interaction.reply({
      ephemeral: true,
      content: `You have already voted the option **${option}**`
    })
    return
  }

  if (userOtherVote) {
    poll.options[userOtherVote].votes = poll.options[
      userOtherVote
    ].votes.filter((el) => el !== userId)
  }
  poll.options[option].votes.push(userId)

  editServerContextParam(serverId, POLL, [
    ...getServerContextParam(serverId)[POLL].filter((el) => el.id !== pollId),
    poll
  ])

  const receivedEmbed = message.embeds[0]
  const editedEmbed = EmbedBuilder.from(receivedEmbed).setFields(
    ...receivedEmbed.fields.map((el) => {
      el.value = `${poll.options[el.name].votes.length}`
      return el
    })
  )

  await message.edit({
    embeds: [editedEmbed]
  })

  await interaction.reply({
    ephemeral: true,
    content: `You have voted **${option}**`
  })
}

const findIdInVotes = (id, options) => {
  console.log(options)
  for (const option in options) {
    if (
      Array.isArray(options[option].votes) &&
      options[option].votes.includes(id)
    ) {
      return option
    }
  }
  return null
}

module.exports = {
  handlePollButtonsInteraction
}
