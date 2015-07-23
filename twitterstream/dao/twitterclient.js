var Twitter = require('twitter');
var defer = require('node-promise').defer;

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = {
	getLastTwentyFive: function(username) {
		var deferred = defer();

		client.get('/statuses/user_timeline.json', {
			screen_name: username,
			count: 25
		}, 
		function(err, response, raw) {
			if(err) {
				deferred.resolve(err);
			} else {
				deferred.resolve(response);
			}
		});

		return deferred.promise;
	}
};