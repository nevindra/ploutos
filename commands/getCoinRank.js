const { SlashCommandBuilder } = require('discord.js');
const {getCoinData} = require('../apis/crypto/marketcoincap.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-coin-rank')
        .setDescription('Get top 10 coin rank'),
    async execute(interaction) {
        try {
            // Get the data from the API
            let data = await getCoinData();

            // Map data to the embed fields
            data = data.map((item, index) => {
                return {
                    name: `#${index + 1} ${item.name}`,
                    // Change digit to 2 decimal places
                    value: `Price: $${parseFloat(item.priceUsd).toFixed(2)}\n
                    Market Cap: $${parseFloat(item.marketCapUsd).toFixed(2)}\n
                    Change Percent: ${parseFloat(item.changePercent24Hr).toFixed(2)}%`,
                    inline: true
                }
            })

            // Send data to embed text to the specific channel
            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Top 3 Market Coin Cap',
                author: {
                    name: 'CoinBot',
                },
                description: 'Here is the top 3 market coin cap',
                fields: data,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Enjoy!',
                },
            };

            //Send the embed to the channel
            await interaction.reply({ embeds: [exampleEmbed] });
        } catch (e) {
            throw e
        }
    },
};
