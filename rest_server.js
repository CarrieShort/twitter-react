const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const twitterRouter = require(__dirname + '/routes/twitter_router');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});
app.use('/api', twitterRouter);

module.exports = app.listen(PORT, () => {
  console.log('server up on port ' + PORT);
});
