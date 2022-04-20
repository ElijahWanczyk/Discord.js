//go to uptime.com or statuscake.com and create a account, then click Monitor or Add New, Then, put a name, then put the link from replit.com, click Done on the bottom. Then, your discord bot should be online 24/7!
const app = require('express')();

app.get('/', (req, res) => res.send('Server is up.'));

module.exports = () => {
  app.listen(3000);
}
