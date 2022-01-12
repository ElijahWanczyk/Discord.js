//go to uptimerobot.com and create a account, then click Monitor, click on Please Select, select HTTP(s). Then, put a name, then put the link from replit.com that is on top of Server is up! Then, your discord bot should be online 24/7!
const app = require('express')();

app.get('/', (req, res) => res.send('Server is up.'));

module.exports = () => {
  app.listen(3000);
}
