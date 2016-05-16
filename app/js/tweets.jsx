const React = require('react');
const request = require('superagent');
const baseUrl = 'http://localhost:3000';

const RecentTweets = React.createClass({
  loadTwitterData: function() {
    this.serverRequest = request.get(baseUrl + '/api/recent_tweets').end(function(err, res) {
      var tweets = JSON.parse(res.text).data;
      this.setState({tweets: tweets,});
    }.bind(this));
  },

  getInitialState: function() {
    return {
      tweets: []
    };
  },

  componentDidMount: function() {
    this.loadTwitterData();
  },

  render: function() {
    return (
      <div className="recent-tweets">
        <h1>
          Recent Tweets</h1>
        <NewTweet data={this.state.tweets}/>
        <TweetList data={this.state.tweets}/>
      </div>
    )
  }
});

var TweetList = React.createClass({
  handleDelete: function(e) {
    var currentTweets = this;
    var tv = e.target.value;
    var tweet = this.props.data[tv];
    var tweetId = tweet.id_str;
    return this.serverRequest = request.del(baseUrl + '/api/remove_tweet/' + tweetId).end(function(err, res) {
        var response = JSON.parse(res.text)
        if (err) return console.log(err);
        currentTweets.props.data.splice(tv, 1);
        currentTweets.setState(currentTweets.props.data);
      }.bind(this));
  },

  render: function() {
    return (
      <ul className="tweets">
        {this.props.data.map(function(tweet, tweetIndex) {
          return <li key={tweetIndex}>{tweet.text}<button className="btn btn-default" tweet={tweet} onClick={this.handleDelete} value={tweetIndex}>Delete</button></li>
        }.bind(this))}
      </ul>
    )
  }
});

var NewTweet = React.createClass({
  addTweet: function(e){
    var currentTweets = this;
    e.preventDefault();
    var tweetText = e.target.tweetinput.value;
    e.target.tweetinput.value = '';
    this.serverRequest = request.post(baseUrl + '/api/new_tweet')
    .send({ status: tweetText})
    .end(function(err, res) {
      console.log(res.body.data);
      console.log(currentTweets.props.data);
      currentTweets.props.data.push(res.body.data);
      console.log(currentTweets.props.data);
      currentTweets.setState(currentTweets.props.data);
    }.bind(this));
  },
  render: function (){
    return (
    <form onSubmit={this.addTweet}>
      <input defaultValue="stuff" type="text" name="tweetinput" />
      <button>Tweet</button>
    </form>
  )
  }
});

module.exports = exports = RecentTweets;
