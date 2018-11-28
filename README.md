# LIRI Bot
## Node search for concerts, song info & movie info

User types one of the following commands:
concert-this (name of band or artist)
spotify-this-song (name of a song)
movie-this (name of a movie)
do-what-it-says (no other input is necessary here as it reads from the included random.txt file)

concert-this will take the name of a band or artist and access the BandsInTown API and display the next five shows with the venue, city, state and date of the shows in order.

spotify-this-song will take the name of a song and, using the node-spotify-api module, show you the name of the artist, the song title, the link to the preview or the song itself when available and the album on which it can be found. If no song title is entered it will retrieve the information for "The Sign" by Ace of Base.

movie-this will take the name of a movie and give you the data associated with that movie, like title, plot, critics reviews, actors, release year, plot and language.

do-what-it-says takes two arguments from the included random.txt file and does what it says. If the first argument is 'movie-this' and the second is a movie, it will find the info for that movie.

This was created by Brian Nickila, following detailed instructions by U of M Coding Boot Camp course in November 2018 using JavaScript, Node.js, node-spotify-api, axios, moment, fs, dotenv, bandsintown api, omdb api and spotify.

https://youtu.be/5xrNWvOqVV0
