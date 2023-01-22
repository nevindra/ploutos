const axios = require('axios');

let response = null;

// Create a function to get the data from the API and export to other files
module.exports.getCoinData =
    // Create a function to get the data from the API
    async function getCoinData() {
        // Make a request to the API
        response = await axios.get('https://api.coincap.io/v2/assets?limit=3');
        // Return array of the data from the API
        return response.data.data;
    }