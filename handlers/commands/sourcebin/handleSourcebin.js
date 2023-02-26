const { create } = require('sourcebin')

const handleSumbitSourcebin = async (interaction) => {
  const title = interaction.fields.getTextInputValue('title-sourcebin')

  const description =
    interaction.fields.getTextInputValue('description-sourcebin') ?? ''

  const language =
    interaction.fields
      .getTextInputValue('content-language-sourcebin')
      .toLowerCase() ?? 'text'

  const content = interaction.fields.getTextInputValue('content-sourcebin')

  const bin = await create({
    title,
    description,
    files: [
      {
        content,
        language
      }
    ]
  })

  await interaction.reply(bin.shortUrl)
}

module.exports = {
  handleSumbitSourcebin
}
