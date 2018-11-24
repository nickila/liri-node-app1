require("dotenv").config()
var Spotify = require('node-spotify-api');


var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

var action = process.argv[2];
var input = process.argv.slice(3).join(" ");




if (action === "concert-this") {

} else if (action === "spotify-this-song" && input) {
    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songPath = data.tracks.items[0]
        
        function songInfo() {
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
        }
        songInfo();
        
    });

} else if (action === "spotify-this-song" && !input) {
    spotify.search({ type: 'track', query: "The+Sign", limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        songInfo();
    });

} else if (action === "movie-this") {

} else if (action === "do-what-it-says") {

} else {


}












// var inquirer = require("inquirer");
// inquirer.prompt([
//         {
//         type: "input",
//         message: "Type a band and I'll tell you the genre!",
//         name: "band"
//         }
//     ])
//     .then(function(inquirerResponse) {

//             console.log("You like " + inquirerResponse.band);


//             spotify.search({ type: 'artist', query: inquirerResponse.band, limit: 1 }, function(err, data) {
//                 if (err) {
//                   return console.log('Error occurred: ' + err);
//                 }
//                 console.log(JSON.stringify(data));

//                 var genre = data.artists.items[0].genres;


//               for (i = 0; i < genre.length; i ++) {

//               console.log(JSON.stringify(genre[i]).replace(/['"]+/g, '')); 
//               }
//               });


//     })


