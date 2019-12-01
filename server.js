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
const Fuse = require('fuse.js');
const auth = require('./middleware/auth');
const AuthAdmin = require('./middleware/AuthAdmin');

const config = require("config");
var passport     = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mailer = require('./config/nodemailer');

var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));
var fuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32, //Settings for soft matched search
  minMatchCharLength: 1,
  keys: [
    "title",
    "genre",
    "artist",
    "album",
    "year"
  ]
};
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}
console.log(config.get("myprivatekey"));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

var mongoose   = require('mongoose');

var Song     = require('./app/song');           //Mongoose Schemas
var Review     = require('./app/review');
var User     = require('./app/user');
var DMCA    = require('./app/DMCA');
var Privacy = require('./app/Privacy');
var Copyright = require('./app/Copyright');
mongoose.connect('mongodb://localhost:27017/items');




passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(username, password, done){
        
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
                console.log("hi");
                console.log("password "+password);
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
app.use('/api', router);
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
    if(!req.body.email||!req.body.password){
      //request does not have the information to make a new user
      res.status(400).json({message:"Missing info"});
      return;
    }
    /*User.find({email:req.body.email})
    .exec(function(err,user){
        if(user!=null){
            res.end("User already exists");
            return;
        }
    });*/
    
    let user = new User();
    
    user.email = req.body.email;
    console.log("plain password"+req.body.password);
    user.makePassword(req.body.password);
    //User must click link to activate account
    user.activated = false; 
    user.sitemanager = false;
    
     user.save(function(err) {
            if (err){
                console.log(err);
                res.json(err);
                return;
            }
            else{
                res.json({ message: 'User created!' });
                mailer.sendMail(user.email,`http://3.82.99.92:8080/api/user/activate/${user._id}`);
            }
            
        });
        
    
});
router.route('/sitemanager/Privacy')
.get(function(req, res) {
    Privacy.find(function(err, privacy) {
        if(err){
            res.send(err);
        }
        res.json(privacy);
    })
})
.put(AuthAdmin,function(req, res) {
    Privacy.findOne(function(err, privacy) {
        if(err){
            res.send(err);
        }
        privacy.text = req.body.text;
        
        privacy.save(function(err){
            if(err){
                res.send(err);
            }
            res.json(privacy);
        })
    })
})
.post(function(req, res) {
    var privacy = new Privacy();
    privacy.text = req.body.text;
    privacy.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Privacy Policy created!' });
    });
})
router.route('/sitemanager/Copyright')
.get(function(req, res) {
    Copyright.find(function(err, copy) {
        if(err){
            res.send(err);
        }
        res.json(copy);
        
    })
})
.post(AuthAdmin,function(req, res) {
    var copyright = new Copyright();
    copyright.text = req.body.text;
    copyright.date = req.body.date;
    copyright.song_id = req.body.song_id;
    copyright.noticeType = req.body.noticeType;
    copyright.save(function(err){
        if(err){res.send(err);}
        res.json("Notice Logged");
        
    })
})
router.route('/sitemanager/DMCA')
.get(function(req, res) {
    DMCA.find(function(err, dmca) {
        if(err){
            res.send(err);
        }
        res.json(dmca);
    })
})
.put(AuthAdmin,function(req, res) {
    DMCA.findOne(function(err, dmca) {
        if(err){
            res.send(err);
        }
        dmca.text = req.body.text;
        
        dmca.save(function(err){
            if(err){
                res.send(err);
            }
            res.json(dmca);
        })
    })
})
.post(function(req, res) {
    var dmca = new DMCA();
    dmca.text = req.body.text;
    dmca.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'DMCA created!' });
    });
})
router.route('/sitemanager/login')
.post(function(req, res) {
      console.log(req.body.email);
    console.log(req.body.password);
    
passport.authenticate('local', function(err, user, info){
    
       if(err){
         //something went wrong
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
              if(user.sitemanager===true){
                const token = user.generateAdminToken();
                console.log(token);
                res.header("authorization", token).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                sitemanager: user.sitemanager,
                token:token
                });
              }
          }
        }
        else{
           res.status(401).json(info);
       }
       })(req,res);
    
});
router.route('/login')
.post(function(req,res){
    console.log(req.body.email);
    console.log(req.body.password);
    
passport.authenticate('local', function(err, user, info){
        

       if(err){
         //something went wrong
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
              
                const token = user.generateAuthToken();
                console.log(token);
                res.header("authorization", token).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                sitemanager: user.sitemanager,
                token:token
                });
                
         }
       }
       else{
           res.status(401).json(info);
       }
    })(req,res);//make sure you call the function
});

router.route('/songlist')
.get(function(req, res) {
    
    Song.find(function(err, songs) {
    
        res.json(songs);
    })
})
router.route('/songs')
    .get(function(req, res) {
        Song
        .find({hidden:false})
        .sort({avgrating:-1})
        .limit(10)
        .exec(function(err, songs) {
            res.json(songs);
        });
    })
    .post(auth,function(req, res) {
        
        var song = new Song();     
        song.title = sanitizeName(req.body.title);  
        song.artist = sanitizeName(req.body.artist);
        song.numberofratings = 0;
        song.avgrating = 0;
        song.header = "TAG";
        if(req.body.genre !=null){
            song.genre = req.body.genre;
        }
        if(req.body.album !=null){
            song.album = req.body.album;
        }
    
        
        if(req.body.year !=null){
            song.year = req.body.year;
        }
        song.hidden = false;
        if(req.body.reviewer !='' && req.body.reviewtext!='' && req.body.rating !=null){
            var review = new Review();
            review.song_id = song._id;
            review.username = req.body.reviewer;
            review.text = req.body.reviewtext;
            review.rating = req.body.rating;
            song.avgrating = req.body.rating;
            song.numberofratings = 1;
            song.lastreview.push(review);
            
            review.save(function(err){
               if(err){
                   console.log(err);
               } 
            });
        }
        song.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Song created!' });
        });

    });
router.route('/song/:keyword')
    .get(function(req, res) {
        
        Song.find(function(err, songs) {
            var filteredSongs = songs.filter(function(i) {
                return i.hidden === false;
            });
            
            var fuse = new Fuse(filteredSongs,fuseOptions)
            res.json(fuse.search(req.params.keyword));
        
        })
        
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
    .post(auth,function(req, res) {

        var review = new Review();     
        review.text = sanitizeName(req.body.text);  
        review.username = sanitizeName(req.body.username);
        review.song_id = sanitizeName(req.body.song_id);
        console.log(req.body.genre);
        review.rating = req.body.rating;
        Song.findById(review.song_id,function(err, song) {
            song.numberofratings +=1;
            song.lastreview.pop();
            song.lastreview.push(review);
            console.log("current average "+song.avgrating);
            console.log("current avg time number of ratings "+song.numberofratings*song.avgrating);
            console.log("new ratings "+req.body.rating);
            var sum = (song.avgrating*(song.numberofratings-1))+(+req.body.rating);
            
            song.avgrating = ((song.avgrating*(song.numberofratings-1)) + (+req.body.rating)) /song.numberofratings;
            song.save(function(err){
               if(err){
                   res.send(err);
               }
               console.log("Number of ratings incremented");
           })
        });
       
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
            _id: req.params.song_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted review' });
        });
    });
router.route('/review/:song_id')
.delete(function(req,res){
    Review.remove({
            _id: req.params.review_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted review' });
        });
    
});
router.route('/review/mostrecentreview/:song_id')
.get(function(req, res) {
    Review.find({song_id:req.params.song_id})
    .sort({_id:-1})
    .limit(1)
    .exec(function(err, review) {
        res.json(review);
    });
})

router.route('/users')
    .get(AuthAdmin,function(req, res) {
        if(!req.isAdmin){
            console.log('Not admin')
        }
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
       

        var user = new User();    
        user.name = sanitizeName(req.body.name);  
        user.email = sanitizeName(req.body.email);
        user.activated = true;
        
       
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    });
router.route('/user/activate/:user_id')
.get(function(req,res){
    User.findById(req.params.user_id,function(err,user){
        if(user.activated==false){
            user.activated=true;
            user.save(function(err){
                if(err){
                    res.status(405).json(err);
                }
                else{
                    res.json("account activated!");
                }
            });
        }
    });
});
router.route('/user/:user_id')

   
      .put(function(req, res) {
           
      
        User.findById(req.params.user_id, function(err, user) {
            //user.activated = !user.activated;
            user.sitemanager =true;
            
            // save the item
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })
    .delete(AuthAdmin,function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, song) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted user' });
        });
    });
    
router.route('/admin/song/:song_id')
.put(AuthAdmin,function(req,res){
    Song.findById(req.params.song_id,function(err, song) {
        song.hidden= !song.hidden;
        song.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Song updated!' });
            });
    })
    
});
router.route('/admin/activate/:user_id')
.put(AuthAdmin,function(req,res){
    User.findById(req.params.user_id,function(err,user){
    
            user.activated=!user.activated;
            user.save(function(err){
                if(err){
                    res.status(405).json(err);
                }
                else{
                    res.json("account activation changed!");
                }
            });
        
    });
});



    // REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use(passport.initialize());
app.use(express.static('views'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

 // connect to our database