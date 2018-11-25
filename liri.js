require("dotenv").config()
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment")

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

var action = process.argv[2];
var input = process.argv.slice(3).join(" ");





if (action === "concert-this") {

    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("");
            for (var i = 0; i < 5; i++) {
                console.log(response.data[i].venue.name);
                console.log((response.data[i].venue.city) + ", " + (response.data[i].venue.region));
                console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("");
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });



} else if (action === "spotify-this-song" && input) {
    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songPath = data.tracks.items[0]
        console.log("");
        console.log(songPath.album.artists[0].name)
        console.log(songPath.name)
        if (songPath.preview_url) {
            console.log(songPath.preview_url)
        } else if (songPath.external_urls.spotify) {
            console.log(songPath.external_urls.spotify)
        } else {
            console.log("Sorry, no preview available.")
        }
        console.log(songPath.album.name)
    });

} else if (action === "spotify-this-song" && !input) {
    spotify.search({ type: 'track', query: "The+Sign", limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songPath = data.tracks.items[0]
        console.log("");
        console.log(songPath.album.artists[0].name)
        console.log(songPath.name)
        if (songPath.preview_url) {
            console.log(songPath.preview_url)
        } else if (songPath.external_urls.spotify) {
            console.log(songPath.external_urls.spotify)
        } else {
            console.log("Sorry, no preview available.")
        }
        console.log(songPath.album.name)
    });

} else if (action === "movie-this" && input) {
    axios.get("https://www.omdbapi.com/?apikey=trilogy&t=" + input)
        .then(function (response) {
            console.log("");
            console.log(response.data.Title)
            console.log(response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value)
            console.log("Made in " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Starring: " + response.data.Actors)
            console.log("");
        });
} else if (action === "movie-this" && !input) {
    axios.get("https://www.omdbapi.com/?apikey=trilogy&t=mr+nobody")
        .then(function (response) {
            console.log("");
            console.log(response.data.Title)
            console.log(response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value)
            console.log("Made in " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Starring: " + response.data.Actors)
            console.log("");
        });

} else if (action === "do-what-it-says") {

} else {


}














