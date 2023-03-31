const { EmbedBuilder } = require('discord.js')

const handlePollButtonsInteraction = async (client, interaction, buttonId) => {
  const option = buttonId.split('-').reverse()[0]

  const channelId = interaction.channelId
  const messageId = interaction.message.id
  const channel = client.channels.cache.get(channelId)
  const message = await channel.messages.fetch(messageId)

  const receivedEmbed = message.embeds[0]
  const editedEmbed = EmbedBuilder.from(receivedEmbed).setFields(
    ...receivedEmbed.fields.map((el) => {
      if (el.name === option) {
        const votesNumber = +el.value
        el.value = `${votesNumber + 1}`
      }
      return el
    })
  )

  message.edit({
    embeds: [editedEmbed]
  })

  interaction.reply({
    ephemeral: true,
    content: `You have voted **${option}**`
  })
}

module.exports = {
  handlePollButtonsInteraction
}
