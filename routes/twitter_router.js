const Twitter = require('twitter');
const Router = require('express').Router;
const twitterRouter = module.exports = exports = new Router();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY, //eslint-disable-line
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET, //eslint-disable-line
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, //eslint-disable-line
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, //eslint-disable-line
});

twitterRouter.get('/recent_posts/', (req, res) => {
  client.get('statuses/user_timeline', (error, tweets) => {
    if (error) console.log(error);
    res.status(200).json({
        tweets: tweets
      });
  });
});
