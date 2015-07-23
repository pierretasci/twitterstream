var React = require('react');
var TwitterApp = require('./twitterapp.jsx');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

var App = React.createClass({

	render: function() {
		return (
			<div>
				<TwitterApp tweets={initialState} />
			</div>
		);
	}
});

React.render(<TwitterApp 
	tweets={initialState} 
	username={window.location.pathname.replace('/', '')} />, document.getElementById('react-root'));

module.exports = App;