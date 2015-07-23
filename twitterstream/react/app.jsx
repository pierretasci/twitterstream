var React = require('react');
var TwitterApp = require('./twitterapp.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

var App = React.createClass({

	render: function() {
		return (
			<div>
				<TwitterApp />
			</div>
		);
	}
});

module.exports = App;