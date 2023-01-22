const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('watch')
        .setDescription('Set the watchers for the coin')
        .addBooleanOption(option =>
            option.setName('status')
                .setDescription('Set the status of the watchers')
                .setRequired(true)),
    async execute(interaction) {
        let isWatchers = interaction.options.getBoolean('status');
        console.log(isWatchers);
        if (isWatchers) {
            await interaction.reply('Watchers is on!');
        } else {
            await interaction.reply('Watchers is off!');
        }
        return isWatchers;
    },
};
