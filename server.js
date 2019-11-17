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
const cors = require('cors');
var passport     = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var corsOptions = {
  origin: '*'
};


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

var Song     = require('./app/song');
var Playlist     = require('./app/playlist');
var Review     = require('./app/review');
var User     = require('./app/user');

var nev = require('email-verification')(mongoose);


mongoose.connect('mongodb://localhost:27017/items');
nev.configure({
    verificationURL: 'http://184.73.70.178/api/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'useritems',
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'se3316test@gmail.com',
            pass: 'password_12345'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <se3316test@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
    
});
nev.generateTempUserModel(User, function(err, tempUserModel) {
    if (err) {
       console.log(err);
       return;
    }

    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
  });

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(username, password, done){
        console.log('hi');
        User.findOne({email: username}, function(err, user){
            if(err){
                
                return done(err);
            }
            if(!user){
                return done(null, false, {
                    message: "User not found"
                });
            }
            if(!user.validatePassword(password)){
                return done(null, false, {
                    message: "Password is wrong"
                });
            }
            return done(null, user);
        });
    }
));
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

router.route("/register")
.post(function(req,res){
    if(!req.body.name||!req.body.email||!req.body.password){
      //request does not have the information to make a new user
      res.status(400).json({message:"Missing info"});
      return;
    }
    let user = new User();
    
    user.email = req.body.email;
    
    user.name = req.body.name;
    
    user.makePassword(req.body.password);
    //User must click link to activate account
    user.activated = false; 
    
     user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
    
    
});
router.route('/login')
.post(function(req,res){
    console.log(req.body.email);
    console.log(req.body.password);
    
passport.authenticate('local', function(err, user, info){
       if(err){
         //something went wrong
         console.log("err");
         res.status(404).json(err);
         return;
       }
       console.log(user);

       if(user){
          if(!user.activated){
              console.log('not activated')
            //user has not yet visited the activation link
            res.json({message:"account locked"});
          }else{
              console.log('logged in');
            //all good
            /*let token = user.generateJwt();
            res.status(200).json({
                id: user._id,
                token: token
             });*/
             res.json('logged in');
         }
       }
       else{
           res.status(401).json(info);
       }
    })(req,res);//make sure you call the function
});
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
router.route('/reviews')
    .get(function(req, res) {
        Review.find(function(err, reviews) {
            if (err)
                res.send(err);

            res.json(reviews);
        });
    })

    
    .post(function(req, res) {

        var review = new Review();     
        review.text = sanitizeName(req.body.text);  
        review.username = sanitizeName(req.body.username);
        review.song_id = sanitizeName(req.body.song_id);
        console.log(req.body.genre);
        review.rating = req.body.rating;
       
        review.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Review created!' });
        });

    });
     
router.route('/review/:song_id')

    .get(function(req, res) {
         
        Review.find({song_id:req.params.song_id},function(err,reviews){
            if(err){
                res.send(err);
            }
            res.json(reviews);
        })
    
    })
    .delete(function(req, res) {
        Review.remove({
            _id: req.params.review_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted review' });
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
router.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })
    .post(function(req, res) {
        var newemail = req.body.name;
        var newpassword = req.body.password;
        var newname = req.body.name;
        var newUser = User({
            email: newemail,
            password: newpassword,
            name:newname
        });
       
       /*nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
           console.log('hi');
        // some sort of error
        if (err){
            console.log('error');// handle error...
        }
        // user already exists in persistent collection...
        if (existingPersistentUser){
            console.log('user already there');
        }
        // handle user's existence... violently.
        // a new user
        if (newTempUser) {
            var URL = newTempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(email, URL, function(err, info) {
            if (err){
                console.log('error');// handle error...
            }
            // flash message of success
            });
        }
        // user already exists in temporary collection...
        else {
            console.log('error user already exists');
        // flash message of failure...
        }
       });

        */var user = new User();    
        user.name = sanitizeName(req.body.name);  
        user.email = sanitizeName(req.body.email);
        user.activated = true;
        
       
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    });
router.route('/user/:user_id')

    .get(function(req, res) {

    User.findById(req.params.playlist_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
      .put(function(req, res) {
           
      
        User.findById(req.params.user_id, function(err, user) {
            user.activated = req.body.activated;
               
            // save the item
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted user' });
        });
    });

app.use(cors(corsOptions));
    // REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(passport.initialize());
app.use(express.static('views'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

 // connect to our database