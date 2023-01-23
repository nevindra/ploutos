// Import modules for the bot
const fs = require('fs');
const path = require('path');
require('./deploy-commands');
require('./config/reddis.js')

// Import the discord.js module
const { Client, GatewayIntentBits, Collection} = require('discord.js');
const { Token } = require('./config.json');

// Import Cron Job
const job = require('./apis/crypto/cron.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Start the cron job only if boolean from watch command is true
job.start();

// Log in to Discord with your client's token
client.login(Token)