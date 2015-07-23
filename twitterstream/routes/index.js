var React = require('react');
var express = require('express');
var router = express.Router();
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

module.exports = router;
