const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Initial setup for the server')
        .addUserOption(option => option
            .setName('channels')
            .setDescription('Set the channel to use')
            .setRequired(true)),
    async execute(interaction) {
        await interaction.reply('Asik!');
    },
};