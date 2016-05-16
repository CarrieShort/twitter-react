const React = require('react');
const request = require('superagent');
const baseUrl = 'http://localhost:3000';

const RecentTweets = React.createClass({

  // get game info
  loadTwitterData: function() {
    this.serverRequest = request.get(baseUrl + '/api/recent_tweets').end(function(err, res) {
      var tweets = JSON.parse(res.text).data;
      this.setState({tweets: tweets});
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
        <TweetList data={this.state.tweets}/>
      </div>
    )
  }
});

var TweetList = React.createClass({

  render: function() {
    return (
      <ul className="tweets">
        {this.props.data.map(function(tweet) {
          return <li key={tweet.text}>{tweet.text}</li>
        })}
      </ul>
    )
  }
});

module.exports = exports = RecentTweets;
