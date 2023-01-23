const { SlashCommandBuilder } = require('discord.js');
const job = require('../apis/crypto/cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('watch')
        .setDescription('Set the watchers for the coin')
        .addBooleanOption(option =>
            option.setName('status')
                .setDescription('Set the status of the watchers')
                .setRequired(true)),
    async execute(interaction) {
        // Only start the cron job if the boolean is true
        let isWatchers = interaction.options.getBoolean('status');
        await console.log(isWatchers);
        if (isWatchers) {
            await interaction.reply('Watchers is on!');
            job.start();
        } else {
            await interaction.reply('Watchers is off!');
            job.stop();
        }
    },
};
