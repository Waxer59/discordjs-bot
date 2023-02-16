const { Events } = require('discord.js')

const clientOnGuildMemberAdd = (client) => {
  client.on(Events.GuildMemberAdd, async (interaction) => {})
}

module.exports = {
  clientOnGuildMemberAdd
}
