const { ChannelType, PermissionFlagsBits } = require('discord.js')

const handleTicketChannels = async (client, interaction) => {
  if (interaction.customId === 'open') {
    const everyone = interaction.guild.roles.get(
      (role) => role.name === '@everyone'
    )

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}.toLowerCase()`,
      topic: `${interaction.user.id}`,
      type: ChannelType.GuildText,
      permissionsOverwrites: [
        {
          id: everyone.id,
          deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ViewChannel
          ]
        }
      ]
    })

    if (channel.topic === interaction.user.id) {
      interaction.reply({
        content: 'You already have an opened ticket!',
        ephmeral: true
      })
      channel.delete()
      return
    }

    await channel.send({ embeds: [] })
  }
}

const handleButtonsTickets = (client, interaction, butonId) => {
  switch (butonId) {
    case 'open':
      handleTicketChannels(client, interaction)
      break
  }
}

module.exports = {
  handleTicketChannels,
  handleButtonsTickets
}
