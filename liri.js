require('dotenv').config();

var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var userCommand=process.argv[2];
var parameter=process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

order();

function order() {
    switch (userCommand){
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
			mySpotify();
			break;

		case "movie-this":
			movieThis();
			break;

		case "do-what-it-says":
			doIt();
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
	if (parameter === ""){
		parameter ="The sign by ace of base"
	}

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

function movieThis(){
	if (parameter === ""){
		parameter = "Mr. Nobody";
	}

	var queryURL ="http://www.omdbapi.com/?apikey=trilogy&t=" + parameter + "&y=&plot=full&tomatoes=true&r=json";

	request(queryURL, function(error, response, body){
		if (error){
			console.log(error)
		}
		// console.log(body);

		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year of release: " + JSON.parse(body).Year);
		console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);
		console.log("Country where movie was produced: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
	});

}

function doIt() {
	fs.readFile("random.txt", "UTF8", function(error, data){

		var dataArray = data.split(",");
		// console.log(dataArray);

		var command=dataArray[0]
		parameter =dataArray[1]

		switch (command){	
			case "spotify-this-song":
				mySpotify();
				break;
		}
	});
}




