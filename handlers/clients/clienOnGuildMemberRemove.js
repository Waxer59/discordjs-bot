const { Events } = require('discord.js')

const clientOnGuildMemberRemove = (client) => {
  client.on(Events.GuildMemberRemove, async (interaction) => {})
}

module.exports = {
  clientOnGuildMemberRemove
}
