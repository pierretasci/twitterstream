var React = require('react');
var moment = require('moment');

var Tweet = React.createClass({

	render: function() {
		var tweet = this.props.text.split(' ');

		tweet = tweet.map(function(text) {
			if(text.indexOf('http') > -1) {
				// Asssume this is a hyperlink
				return React.renderToString(<a href={text} target="_blank">{text}</a>);
			} else if(text.indexOf('#') === 0) {
				return React.renderToString(
					<a href={"https://twitter.com/hashtag/"+text.replace('#', '')+"?src=hash"} 
						target="_black">{text}</a>);
			} else if(text.indexOf('@') > -1) {
				return React.renderToString(
					<a href={"/" + text.replace('@', '').replace(/[^a-zA-Z0-9]/g, '')}>{text}</a>);
			} else {
				return text;
			}
		}).join(' ');

		return (
			<div>
				<b>{moment(this.props.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</b>
				<p dangerouslySetInnerHTML={{__html: tweet}}></p>
			</div>
		);
	}

});

module.exports = Tweet;