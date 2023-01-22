const {Events} = require("discord.js");

module.exports = {
    // When the client is ready, run this code (only once)
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
}