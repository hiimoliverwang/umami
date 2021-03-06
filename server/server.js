/* Walkthrough of the server

  Express, elasticsearch, mongoose, and our server are initialized here
  Next, we then inject our server and express into our config/middleware.js file for setup.
  We also exported our server for easy testing

  middleware.js requires all express middleware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has its own folder with a model, controller, and route file
    the respective file is required in middleware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to requests
*/

var SERVER_PORT = process.env.PORT || '8000';
//var DB_HOST = process.env.HOST || 'localhost:9200';
var DB_HOST = "search-recipes-dzmzolpqt767iq62hozmwgi6nm.us-west-1.es.amazonaws.com" ;

var express = require('express');
var app = express();
var elasticsearch = require('elasticsearch');
var mongoose = require('mongoose');


// Elasticsearch server is setup here and exported for modularity
var client = new elasticsearch.Client({
  host: DB_HOST,
  log: 'error'
});

// Configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express, client);

app.listen(SERVER_PORT, function(){
  console.log("Listening on port " + SERVER_PORT);
});

// Export our app and db for testing and flexibility, required by index.js
module.exports = {
  app: app
};
