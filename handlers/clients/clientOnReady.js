const { Events } = require('discord.js')

const clientOnReady = (client) => {
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
    c.user.setPresence({ activities: [{ name: 'discord.js' }] })
  })
}

module.exports = {
  clientOnReady
}
