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
var Item      = require('./models/item');
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


router.route('/items')
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
                res.send(err);

            res.json(items);
        });
    })

    
    .post(function(req, res) {

        var item = new Item();     
        item.name = sanitizeName(req.body.name);  
        item.itemType = sanitizeName(req.body.itemType);
        item.loanPeriod = sanitizeString(req.body.loanPeriod);
        item.quantity = 1;
        console.log(item.name);
        console.log(item.itemType);
        console.log(item.loanPeriod);
    
        item.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Item created!' });
        });

    });
     
router.route('/items/:item_id')

    .get(function(req, res) {

    Item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.send(err);
            res.json(item);
        });
    })
      .put(function(req, res) {
      
        Item.findById(req.params.item_id, function(err, item) {

            if (err)
                res.send(err);
            if(req.body.loanPeriod != undefined){
                item.loanPeriod =sanitizeString(req.body.loanPeriod);  // update the items info
            }
            if(req.body.quantity != undefined){
                item.quantity = sanitizeString(req.body.quantity);  // update the items info
            }
                
            // save the item
            item.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Item updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
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