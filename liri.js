require('dotenv').config();

var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var userInput=process.argv[2];
var parameter=process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

order();

function order() {
    switch (userInput){
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
			mySpotify();
			break;
    }
}

function myTweets(){
	var params = {screen_name: 'basosa94'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	  		for (var i = 0; i < tweets.length; i++) {
	  			console.log(tweets[i].created_at + ": " + tweets[i].text);
	  		}
	  	}  
	});
}


function mySpotify(){
 spotify.search({ type: 'track', query: parameter }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
	
	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	console.log("Song: " + data.tracks.items[0].name);
	console.log("Preview link: " + data.tracks.items[0].preview_url)
	console.log("Album: " + data.tracks.items[0].album.name);
	});
}





