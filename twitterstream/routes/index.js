var React = require('react');
var express = require('express');
var router = express.Router();
var when = require('node-promise').when;
var TwitterClient = require('../dao/twitterclient');
var TwitterAppComponent = require('../react/twitterapp.jsx');
var TwitterApp = React.createFactory(TwitterAppComponent);

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Pierre Tasci - Twitter Stream',
  	reactContent: React.renderToString(TwitterApp()),
  	initialState: JSON.stringify({})
  });
});

router.get('/:id', function(req, res, next) {
	when(TwitterClient.getLastTwentyFive(req.params.id), function(tweets) {
		res.render('index', { 
	  	title: 'Pierre Tasci - Twitter Stream',
	  	reactContent: React.renderToString(TwitterApp({tweets: tweets, username: req.params.id})),
	  	initialState: JSON.stringify(tweets)
	  });
	});
});

module.exports = router;
