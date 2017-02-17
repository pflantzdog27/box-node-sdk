// MODULES / REQUIREMENTS ===================================================

var express = require('express'),
    app = express(),
    BoxSDK = require('box-node-sdk'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');


// CONFIGURATION =============================================
app.set('view engine', 'ejs');


//parse application/json
app.use(bodyParser.json());
//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//override with the X-HTTP-Method-Override header in the request.  simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//set port
port = process.env.PORT || 8080;

// ROUTES ===================================================

//configure routes
require('./app/routes')(app);

// START APP ================================================

//start the app at http://localhost:8080
app.listen(port);
//shoutout to the user
console.log('Magic happens at http://localhost:'+port);
//expose app
exports = module.exports = app;