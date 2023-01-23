const cron = require('cron');
const { getMarketData } = require('./crypto');

// Create a cron job every second
const job = new cron.CronJob('* * * * *', async () => {
    // Get the data from the API
    return await getMarketData()
})
// Start the cron job
module.exports = job;
