const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const twitterRouter = require(__dirname + '/routes/twitter_router');

app.use('/api', twitterRouter);

module.exports = app.listen(PORT, () => {
  console.log('server up on port ' + PORT);
});
