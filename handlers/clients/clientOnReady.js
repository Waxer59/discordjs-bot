const { Events } = require('discord.js')
const { initializeCache } = require('../../cache/initializers/initializeCache')
const { deleteAllValues } = require('../../cache/client')

const clientOnReady = (client) => {
  client.once(Events.ClientReady, async (c) => {
    await deleteAllValues()
    c.guilds.cache.forEach((guild) => {
      initializeCache(client, guild.id)
    })
    c.user.setPresence({ activities: [{ name: 'discord.js' }] })
  })
}

module.exports = {
  clientOnReady
}
