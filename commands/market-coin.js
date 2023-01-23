const { SlashCommandBuilder } = require('discord.js');
const {getMarketData} = require('../apis/crypto/crypto.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-coin-rank')
        .setDescription('Get top 10 coin rank'),
    async execute(interaction) {
        try {
            // Get the data from the API
            let data = await getMarketData();
            console.log(data);
            // Change each value data type to float execpt for the name and
            // add . separator to the number for better readability
            data = data.map(item => {
                return {
                    name: item.name,
                    priceUsd: parseFloat(item.priceUsd).toLocaleString(),
                    marketCapUsd: parseFloat(item.marketCapUsd).toLocaleString(),
                    changePercent24Hr: parseFloat(item.changePercent24Hr).toLocaleString()
                }
            })
            // Create an array of object to store the data
            let fields = [];

            // Loop through the data and push the data to the fields array
            for (let i = 0; i < data.length; i++) {
                fields.push({
                    name: `${i + 1}. ${data[i].name}\n`,
                    value: `Price: $${data[i].priceUsd}\n
                    Market Cap: $${data[i].marketCapUsd}\n
                    **Change 24Hr: ${data[i].changePercent24Hr}%**\n`,
                    inline: true
                })
            }
            // Send data to embed text to the specific channel
            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Top 3 Market Coin Cap',
                author: {
                    name: 'CoinBot',
                },
                description: 'Here is the top 3 market coin cap',
                fields: fields,
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
