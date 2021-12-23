const app = require('express')();

app.get('/', (req, res) => res.send('Your bot is online!'));

module.exports = () => {
  app.listen(3000);
}
