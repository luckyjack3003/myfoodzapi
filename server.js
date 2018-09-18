// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Menu=require('./app/models/menu');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

const DB_URL = 'mongodb://localhost/foodz';

if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL); }

// middleware to use for all requests
router.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/menus')
    // get all the bears (accessed at GET http://localhost:8080/api/menus)
    .get(function(req, res) {
        Menu.find(function(err, menus) {
            if (err)
                res.send(err);

            res.json(menus);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
