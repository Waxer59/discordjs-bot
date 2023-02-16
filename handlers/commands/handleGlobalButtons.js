const handleGlobalButtons = (client, interaction) => {
  const buttonId = interaction.customId

  switch (buttonId) {
    case 'close-ticket':
      interaction.channel.delete()
      break
  }
}

module.exports = {
  handleGlobalButtons
}
