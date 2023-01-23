const { SlashCommandBuilder } = require('discord.js');
const { getCoinData } = require('../apis/crypto/crypto.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('Get the specific coin information')
        .addStringOption(option =>
            option.setName('coin')
                .setDescription('The coin name')
                .setRequired(true)
        ),
    async execute(interaction) {
        let coin = interaction.options.getString('coin');
        let data;
        try {
            // Get the data from the API
            data = await getCoinData(coin);
        } catch (e) {
            throw e
        }
        if (data.response === null) {
            interaction.reply('Coin not found, please use the correct coin name. `Example: /coin bitcoin`');
        }

        // limit the description to 1 paragraph
        if (data.description.en.length > 200) {
            data.description.en = data.description.en.substring(0, 200) + '...';
        }

        // Send data to embed text to the specific channel
        const coinEmbed = {
            color: 0x0099ff,
            title: `${data.name} (${data.symbol.toUpperCase()})`,
            author: {
                name: 'CoinBot',
            },
            thumbnail: {
                url: data.image.large,
            },
            description: `${data.description.en}`,
            fields:[
                // Show data such as: market_cap_rank, current_price in usd, market_cap in usd, price_change_percentage_24h
                {
                    name: 'Market Cap Rank',
                    value: data.market_cap_rank,
                },
                {
                    name: 'Current Price',
                    value: `$${data.market_data.current_price.usd}`,
                },
                {
                    name: 'Market Cap',
                    value: `$${data.market_data.market_cap.usd}`,
                },
                {
                    name: 'High 24h',
                    value: `$${data.market_data.high_24h.usd}`,
                    inline: true
                },
                {
                    name: 'Low 24h',
                    value: `$${data.market_data.low_24h.usd}`,
                    inline: true
                },
                {
                    name: 'Price Change Percentage 24h',
                    value: `${data.market_data.price_change_percentage_24h}%`,
                    inline: true
                },
                {
                    name: 'Price Change Percentage 7d',
                    value: `${data.market_data.price_change_percentage_7d}%`,
                    inline: true
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Data is provided by CoinGecko!',
                iconURL: 'https://assets.coingecko.com/markets/images/000/000/001/thumb/coin_gecko.png?1601358692',
            },
        };

        // Send the embed to the channel
        await interaction.reply({ embeds: [coinEmbed] });
    },
};
