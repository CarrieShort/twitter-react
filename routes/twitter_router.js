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

twitterRouter.get('/recent_posts', (req, res) => {
  client.get('statuses/user_timeline', (error, tweets) => {
    if (error) console.log(error);
    res.status(200).json({
        tweets: tweets
      });
  });
});

twitterRouter.post('/new_tweet', bodyParser, (req, res) => {
  client.post('statuses/update', { status: req.body.status }, (error, tweets) => {
    if (error) console.log(error);
    res.status(200).json({
      tweets: tweets
    });
  });
});

twitterRouter.delete('/remove_tweet/:id', (req, res) => {
  console.log(req.params.id);
  // client.post('statuses/destroy/731996797053210600', (error, data) => {
  //   if (error) console.log(error);
  //   // console.log(thing1, thing2, thing3);
  //   res.status(200).json({
  //     tweet: data
  //   });
  // });
  client.post('statuses/destroy/:id', { id: '731999038040506369' }, function (err, data, response) {
  console.log(data)
})
});
