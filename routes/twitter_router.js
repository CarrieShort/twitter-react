const Twitter = require('twit');
const Router = require('express').Router;
const twitterRouter = module.exports = exports = new Router();
const bodyParser = require('body-parser').json();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY, //eslint-disable-line
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET, //eslint-disable-line
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY, //eslint-disable-line
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, //eslint-disable-line
});

twitterRouter.get('/recent_tweets', (req, res) => {
  client.get('statuses/user_timeline', (error, data) => {
    if (error) return console.log(error);
    res.status(200).json({
        data: data
      });
  });
});

twitterRouter.post('/new_tweet', bodyParser, (req, res) => {
  client.post('statuses/update', { status: req.body.status }, (error, data) => {
    if (error) return console.log(error);
    res.status(200).json({
      data: data
    });
  });
});

twitterRouter.delete('/remove_tweet/:id', (req, res) => {
  client.post('statuses/destroy/:id', { id: req.params.id }, (error, data) => {
    if (error) return console.log(error);
    res.status(200).json({
        data: data.text + ' has been deleted'
      });
    });
  });
