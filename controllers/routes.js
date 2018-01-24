var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// Requiring our Note and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");


router.get("/", function(req, res) {
	//scrape
	//save to db
	//query db 
	//render hb

	// scrape
	// save to db
		//Look into 20.Scraping-With-Mongoose activity server.js "app.get("/scrape"..."" route
		// as an example to scrape and save to db.

	// query db
		//Look into 19.Populated-Exercise activity server.js line ~123 "app.get("/populateduser"..."" route.
		// to query db for articles and populate with comments
	res.render("index", query data)
});



router.post("/savecomments", function(req,res){

	//incoming data req.body


	// Look into 19.Populated-Exercise activity server.js line ~96 "app.post("/submit" ..." route.
	
	// in a post request incomming data (from front end) is in req.body
	res.redirect("/");

});



router.post("/deletecomments", function(req.res){

	res.redirect("/");

});




module.exports = router;

