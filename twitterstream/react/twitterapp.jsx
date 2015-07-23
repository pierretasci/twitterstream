var React = require('react/addons');
var Tweet = require('./tweet.jsx');

var TwitterApp = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getDefaultProps: function() {
		return {
			tweets: []
		};
	},
	getInitialState: function() {
		return {
			username: this.props.username 
		};
	},
	render: function() {
		return (
			<div>
				<h1>Pierre&#39;s Last 25 Tweets Reader</h1>
				<input type="text" valueLink={this.linkState('username')} />
				<button type="button" onClick={this._newSearch}>Submit</button>
				{this.props.tweets.map(function(tweet, i) {
					return <Tweet {...tweet} key={i} />;
				})}
			</div>
		);
	},
	_newSearch: function() {
		console.log("CALLED");
		window.location.pathname = "/" + this.state.username;
	}
});

module.exports = TwitterApp;