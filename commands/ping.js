const { SlashCommandBuilder } = require('discord.js');
const {getCoinData} = require('../apis/crypto/marketcoincap.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        // Get the data from the API
        let data = await getCoinData();
        await interaction.reply('Asik!');

    },
};
