const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { deploySlashCommands } = require('./helpers/deploy-commands');
const { Player } = require('discord-music-player');
const { handleClientEvents } = require('./handlers/handleClientEvents');
const { dbConnection } = require('./db/config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

connectToDatabase();

client.commands = new Collection();

//* SETUP COMMANDS
deploySlashCommands(client);

//* MUSIC LIBRARY
const player = new Player(client);
client.player = player;

handleClientEvents(client);

async function connectToDatabase() {
  await dbConnection();
}
