const { create } = require('sourcebin')

const handleSumbitSourcebin = async (interaction) => {
  const title = interaction.fields.getTextInputValue('title-sourcebin')

  const description =
    interaction.fields.getTextInputValue('description-sourcebin') ?? ''

  const content = interaction.fields.getTextInputValue('content-sourcebin')

  try {
    const bin = await create({
      title,
      description,
      files: [
        {
          content,
          language: 'text'
        }
      ]
    })
    await interaction.reply(bin.shortUrl)
  } catch (error) {
    await interaction.reply({
      content: 'Something went wrong :('
    })
  }
}

module.exports = {
  handleSumbitSourcebin
}
