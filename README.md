# liri node-app
Search OMDB, Spotify, and Bands in Town APIs.
Built on NodeJS.


SIRI = Speech Interpretation and Recognition Interface 
LIRI = Language Interpretation and Recognition Interface. 

Environment Setup
To use LIRI, you need to create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you have them:

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
What does LIRI do?

LIRI is a command line node app that takes in the following parameters: 

node liri.js movie-this '<movie name here>'
![move-this "the americans"](movie_this.gif)

Search Spotify for songs
node liri.js spotify-this-song '<song name here>'

spotify search

Bands in Town for concerts
node liri.js concert-this <artist/band name here>

concert search

OMDB for movies

movie search

Do above based on txt input file
node liri.js do-what-it-says

do-what-it-says spotify search

do-what-it-says movie search

do-what-it-says concert search

APIs used in this bot:
Node-Spotify-API

Axios

OMDB API

Bands In Town API

Moment

DotEnv