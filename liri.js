//====================================================//
require("dotenv").config();
const axios = require('axios');
var fs = require('fs');
const moment = require('moment');
    moment().format();
const Spotify = require('node-spotify-api');

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

//====================================================//
const op = process.argv[2];
switch(op) {
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "do-what-it-says":
        doIt();
        break;
}
//====================================================//

function movieThis() { 
const omdbUrl = 'http://www.omdbapi.com/?t='
const apikey = '&apikey=d20c939a';
const input = process.argv[3];
const endpoint = omdbUrl + input + apikey;
// console.log(endpoint);

// Make a request for a user with a given ID
axios.get(endpoint).then(function (response) {

    console.log("===================================");
    console.log("TITLE: " + response.data.Title);
    console.log("RELEASE DATE: " + response.data.Year);
    console.log("RATINGS: " + response.data.Ratings[0].Value);
    console.log("RT RATING: " + response.data.Metascore);
    console.log("ORIGIN: " + response.data.Country);
    console.log("LANGUAGE: " +response.data.Language);
    console.log("PLOT: " + response.data.Plot);
    console.log("ACTORS: " + response.data.Actors);
    console.log("====================================");

});

}

function concertThis() {
const bandsKey = "codingbootcamp";
const bandSearch = process.argv[3];
const endpoint = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=%3Fapp_id%3D" + bandsKey;


axios.get(endpoint).then(
    function (res) {
        console.log("===================================");
        console.log("EVENT INFO FOR: " + bandSearch)
        console.log("VENUE: " + res.data[0].venue.name);
        console.log("CITY: " + res.data[0].venue.city);
        console.log("ON: " + moment(res.data[0].datetime).format("MM-DD-YYYY"));
        console.log("===================================");
    });
};

function spotifySong() {
    var spotify = new Spotify(keys.spotify);
    song = process.argv[3];
    if (process.argv[3] === undefined) {
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {
                console.log("===================================");
                console.log("SONG INFO: ");
                console.log(data.name + " by " + data.artists[0].name + ", off the album, '" + data.album.name + "'.");
                console.log("Check it out here: " + data.preview_url);
                console.log("===================================");
            })
            .catch(function (err) {
                console.error('ERROR: ' + err);
            });
    } else {
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                
                    var spotifyResults =
                    "------------------------------ " + (i + 1) + " ------------------------------"
                    + "\r\n" + songInfo[i].name + " by " + songInfo[i].artists[0].name  +
                    " off the album, " + "'" + songInfo[i].album.name + "'" + "\r\n" + 
                    "\r\n" + "Check it out here: " + "\r\n" + 
                    songInfo[i].preview_url + "\r\n";

                    console.log(spotifyResults);
 
                }        
        });
        
    }

};

function doIt() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doItResults = data.split(",");
				spotifySong(doItResults[0], doItResults[1]);
			} else {
				console.log("ERROR!" + error);
			}
		});
    };
