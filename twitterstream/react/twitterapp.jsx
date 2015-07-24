var React = require('react/addons');
var Tweet = require('./tweet.jsx');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var Button = Bootstrap.Button; 

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
		var submit = <Button bsStyle="primary" 
			bsSize="large"
			onClick={this._newSearch}>Submit</Button>;

		return (
			<div className="container">
				<h1>Last 25 Tweets Reader</h1>
				<Input type="text" 
					bsSize="large" 
					valueLink={this.linkState('username')} 
					placeholder="Enter twitter name..."
					buttonAfter={submit} />
				{this.props.tweets.map(function(tweet, i) {
					return <Tweet {...tweet} key={i} />;
				})}
			</div>
		);
	},
	_newSearch: function() {
		window.location.pathname = "/" + this.state.username;
	}
});

module.exports = TwitterApp;