console.log('this is loaded');
require('dotenv').config()
// var spotify = "foobar";
// export it

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
