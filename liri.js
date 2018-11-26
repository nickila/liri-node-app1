require("dotenv").config()
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment")
var fs = require('fs');
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

var action = process.argv[2];
var input = process.argv.slice(3).join(" ");



function liriDo() {
    if (action === "concert-this") {
        axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("");
                var movieInfo;
                for (var i = 0; i < 5; i++) {
                    movieInfo = ("\n" + (response.data[0].lineup[0]) + "\n" + (response.data[i].venue.name) + "\n" +
                        (response.data[i].venue.city) + "," +
                        (response.data[i].venue.region) + "\n" +
                        (moment(response.data[i].datetime).format("MM/DD/YYYY")) + "\n");
                    console.log(movieInfo);
                    fs.appendFile("concert-log.txt", movieInfo, function read(err, data) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
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
            var spotResP = ("\n" + songPath.album.artists[0].name + "\n" + songPath.name + "\n" + songPath.preview_url + "\n" + songPath.album.name + "\n")
            var spotResF = ("\n" + songPath.album.artists[0].name + "\n" + songPath.name + "\n" + songPath.external_urls.spotify + "\n" + songPath.album.name + "\n")
            console.log(spotResP)
            if (songPath.preview_url) {
                console.log(spotResP)
                fs.appendFile("spotify-log.txt", "\n" + action + ", " + input + spotResP, function read(err, data) {
                    if (err) {
                        throw err;
                    }
                })
            } else if (songPath.external_urls.spotify) {
                console.log(spotResF)
                fs.appendFile("spotify-log.txt", "\n" + action + ", " + input + spotResF, function read(err, data) {
                    if (err) {
                        throw err;
                    }
                })
            } else {
                console.log("Sorry, preview not available.")
            }
        })


    } else if (action === "spotify-this-song" && !input) {
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {
                var spotNull = ("\n" + data.artists[0].name + "\n" + data.name + "\n" + data.external_urls.spotify + "\n" + data.album.name + "\n")
                console.log(spotNull);
                fs.appendFile("spotify-log.txt", "\n" + action + ", (no song entered):" + spotNull, function read(err, data) {
                    if (err) {
                        throw err;
                    }
                });


                //   var songPath = data.tracks.items[0]
                //     console.log("");
                //     console.log(songPath.album.artists[0].name)
                //     console.log(songPath.name)
                //     if (songPath.preview_url) {
                //         console.log(songPath.preview_url)
                //     } else if (songPath.external_urls.spotify) {
                //         console.log(songPath.external_urls.spotify)
                //     } else {
                //         console.log("Sorry, no preview available.")
                //     }
                //     console.log(songPath.album.name); 
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });



    } else if (action === "movie-this" && input) {
        axios.get("https://www.omdbapi.com/?apikey=trilogy&t=" + input)
            .then(function (response) {
                console.log("");
                console.log(response.data.Title)
                console.log(response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating)
                if (response.data.Ratings[1] && response.data.Ratings[1].Source === "Rotten Tomatoes") {
                    console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value)
                } else {
                    console.log("Rotten Tomatoes: N/A")
                }
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
    }


    if (action === "do-what-it-says") {


        fs.readFile("random.txt", "utf-8", function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
            processFile();
        });

        function processFile() {
            var textArr = content.split(",");
            action = textArr[0]
            input = textArr[1]
            liriDo();
        }
    };
};

liriDo();

