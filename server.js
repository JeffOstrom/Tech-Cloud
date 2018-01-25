//Dependencies npm packages
var express = require("express");
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
//Require request and cheerio for scraping
var cheerio = require("cheerio");
var request = require("request");
// Set mongoose to leverage built in JavaScript 
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

// Initialize Express
var APP = express();

// Use body parser
APP.use(bodyParser.urlencoded({extended: false}));

// Make public a static dir
APP.use(express.static("public"));

// Set Handlebars.
APP.engine("handlebars", exphbs({ defaultLayout: "main" }));
APP.set("view engine", "handlebars");


// Database configuration with mongoose
if(process.env.MONGODB_URI)
{
	mongoose.connect(process.env.MONGODB_URI);
}
else
{
	mongoose.connect("mongodb://localhost/mongo-scrape");
}	

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes
// ======
var routes = require("./controllers/routes.js");
APP.use(routes)


// Listen on port 3000
APP.listen(PORT, function() {
  console.log("App running on port", PORT);
});
