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

const PORT = process.env.PORT || 3000;

// Initialize Express
const APP = express();

// Use body parser
APP.use(bodyParser.urlencoded({extended: false}));

// Make public a static dir
APP.use(express.static("public"));

// Set Handlebars.
APP.engine("handlebars", EXPHBS({ defaultLayout: "main" }));
APP.set("view engine", "handlebars");


// Database configuration with mongoose
if(process.env.MONGODB_URI)
{
	mongoose.connect(process.env.YOUR MONGODB_URI HERE);
}
else
{
	mongoose.connect("mongodb://localhost/YOUR DB NAME HERE");
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
app.use("/", routes);

// Listen on port 3000
APP.listen(PORT, function() {
  console.log("App running on port", PORT);
});
