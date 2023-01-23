const axios = require('axios');

let response = null;

// A function to get top market data
async function getMarketData() {
    // Make a request to the API
    response = await axios.get('https://api.coincap.io/v2/assets?limit=3');
    // Return array of the data from the API
    return response.data.data;
}
// A function to get single coin data
async function getCoinData(id) {
    try {
        response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`,
            {params: {
                    localization: false,
                    tickers: false,
                    market_data: true,
                    community_data: false,
                    developer_data: false,
                    sparkline: false
                }});
        // Return the data from the API
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            return {response: null}
        }
    }
}

// Export all the function here
module.exports = {
    getMarketData,
    getCoinData
}