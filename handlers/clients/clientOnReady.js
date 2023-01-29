const { Events } = require('discord.js')
const { initializeContext } = require('../../context/initializeContext')

const clientOnReady = (client) => {
  client.once(Events.ClientReady, (c) => {
    c.guilds.cache.forEach((guild) => {
      initializeContext(client, guild.id)
    })
    c.user.setPresence({ activities: [{ name: 'discord.js' }] })
  })
}

module.exports = {
  clientOnReady
}
