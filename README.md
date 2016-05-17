# twitter-react
react framework with node to integrate with twitter api.


## Before using our app
Please using `npm install` before using our app.
Please setup a developer account on twitter and copy your
````
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN_KEY
TWITTER_ACCESS_TOKEN_SECRET
````
into your bash_profile

### dependencies
* express
* twit

### devDependencies
* babel-core
* babel-loader
* babel-plugin-transform-runtime
* babel-polyfill"
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* babel-runtime
* body-parser
* css-loader
* gulp
* gulp-eslint
* http-server
* jQuery
* json-loader
* jsx-loader
* react
* react-dom
* style-loader
* superagent
* webpack
* webpack-dev-server
* webpack-stream

## using our app
Please run `gulp` to create a bundle.js. Next run our two servers using node `node rest_server.js` and `node app_server.js`. This will allow you to view our site in the browser once you go to `http://localhost:5000`

From there you can make a tweet on our twitter page and see our recent tweets.
