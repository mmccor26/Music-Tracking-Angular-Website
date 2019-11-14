// server.js
function sanitizeString(str){
    str = str.replace(/[^0-9 \.]/gim,"");
    return str.trim();
}
function sanitizeName(str) {
    str = str.replace(/[&\/\\!#,+^()$~%.'":[*?@_=|<>{};]/g, '');
    return str.trim();
};
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/items');
var Song     = require('./models/song');
var Playlist     = require('./models/playlist');
var Review     = require('./models/review');
var User     = require('./models/user');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here


router.route('/songs')
    .get(function(req, res) {
        Song.find(function(err, songs) {
            if (err)
                res.send(err);

            res.json(songs);
        });
    })

    
    .post(function(req, res) {

        var song = new Song();     
        song.title = sanitizeName(req.body.title);  
        song.artist = sanitizeName(req.body.artist);
        console.log(req.body.genre);
        song.genre = sanitizeName(req.body.genre);
       
        song.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Song created!' });
        });

    });
     
router.route('/song/:song_id')

    .get(function(req, res) {

    Song.findById(req.params.song_id, function(err, song) {
            if (err)
                res.send(err);
            res.json(song);
        });
    })
      .put(function(req, res) {
      
        Song.findById(req.params.song_id, function(err, song) {

            if (err)
                res.send(err);
            if(req.body.genre != undefined){
                song.genre =sanitizeName(req.body.genre);  // update the items info
            }
            
                
            // save the item
            song.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Song updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Song.remove({
            _id: req.params.song_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted song' });
        });
    });
router.route('/playlists')
    .get(function(req, res) {
        Playlist.find(function(err, playlists) {
            if (err)
                res.send(err);

            res.json(playlists);
        });
    })
    .post(function(req, res) {

        var playlist = new Playlist();     
        playlist.title = sanitizeName(req.body.title);  
        playlist.description = sanitizeName(req.body.description);
        console.log(req.body.genre);
        
       
        playlist.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Playlist created!' });
        });

    });
     
router.route('/playlist/:playlist_id')

    .get(function(req, res) {

    Playlist.findById(req.params.playlist_id, function(err, playlist) {
            if (err)
                res.send(err);
            res.json(playlist);
        });
    })
      .put(function(req, res) {
           var song;
            Song.findById(req.body.song_id,function(err, foundSong) {
                song = foundSong;
            });
      
        Playlist.findById(req.params.playlist_id, function(err, playlist) {
            playlist.songs.push(song)
               
            // save the item
            playlist.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Playlist updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Playlist.remove({
            _id: req.params.playlist_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted playlist' });
        });
    });
    // REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static('views'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

 // connect to our database