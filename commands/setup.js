const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Initial setup for the server')
        .addChannelOption(opt =>
            opt.setName('channels')
                .setDescription('Set the channel to use')
                .setRequired(true)
                .addChannelTypes(0) // 0 = Text channel
        ),
    async execute(interaction) {
        // Get channel ID from the user
        let channel = interaction.options.getChannel('channels');
        await interaction.reply('Registering your channel...');
        // Send a message to channel based on the ID given before
        try {
            // send a message to the given channel ID and then delete the message.
            let msg = await channel.send('This channel will be used to inform you about the new updates.')
            setInterval(async () => {
                await msg.delete()
            }, 500)
        } catch (e) {
            throw e
        }
    },
};