const { Events } = require('discord.js')
const { handleGuildDelete } = require('../handleGuildDelete')

const clientOnGuildDelete = (client) => {
  client.on(Events.GuildDelete, async (interaction) => {
    handleGuildDelete(interaction.id)
  })
}

module.exports = {
  clientOnGuildDelete
}
