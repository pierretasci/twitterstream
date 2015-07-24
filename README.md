# Pierre's Twitter Stream

This application will accept a twitter handle in it's input and spit out the last 25 tweets from that user if they exist. It will also try to parse the tweet and convert:
* Text based links to actual hyperlinks
* Twitter hashtags to links to twitter.com for that hashtag
* Twitter handles into internal application links to see that user's last 25 tweets

This app is a simple Express/React app. It was built in only 4 hours and is responsive.

## How it works

### Express

I first created an express app and set it up to serve static jade markup to the frontend. I then added a simple react class just to start the rendering of react to the screen

### Twitter

The next step was creating a connection to Twitter. For this task I used the Twitter npm module which made setting up the connection easy. I imported a promises library so I could consume the correct twitter data when the express app receives a request with a username in the path. I exposed this as a simple dao that the router consumes.

### React

The react logic here is very simple. The TwitterApp class sets up the screen and iterates through the tweets creating a Tweet class per tweet. The Tweet will then parse the actual text and replace content as it finds it.

### Bootstrap

Finally, I added Twitter bootstrap (quite apropriately) to give my app a little better look and feel as well as for the built in responsiveness. 

## Local Setup

First clone the repo.
```
git clone https://github.com/pierretasci/twitterstream/
```
Next, install the dependencies in the package.json
```
npm install
```
Lastly, run the app. In order to do this you will need a twitter client key and a twitter secret key because the app will not run if they are not part of the env.
```
TWITTER_CONSUMER_KEY=[consumer key] TWITTER_CONSUMER_SECRET=[secret key] npm start
```
## Heroku
The app is available from heroku at https://pttwitterstream.herokuapp.com/

## Tests
This is ideally something I would have done as I went but again it was done in 4 hours. This should be the next step.
