const cron = require('cron');
const { getCoinData } = require('./marketcoincap');

// Create a cron job every second
const job = new cron.CronJob('* */1 * * *', async () => {
    // Get the data from the API
    const data = await getCoinData();
    // Log the data to the console
    console.log(data);
})
// Start the cron job
module.exports = job;
