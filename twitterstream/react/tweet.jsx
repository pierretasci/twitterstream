var React = require('react');
var moment = require('moment');

var Tweet = React.createClass({

	render: function() {
		return (
			<div>
				{moment(this.props.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}
				<br />
				{this.props.text}
				<br /><br />
			</div>
		);
	}

});

module.exports = Tweet;