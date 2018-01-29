// var path = require("path");
// var express = require("express");
// var router = express.Router();

// var Note = require("../models/Note.js");
// var Article = require("../models/Article.js");

// router.get('/', function(req, res) {

// 	// Grab every doc in the Articles array
// 	Article.find({}).limit(15)
// 	.then(function(articles) {

// 			res.render('index', {articles:articles});

// 	})
// 	.catch(function(error){
// 			console.log(error);
// 			res.render("index",{"status":"fail"})
// 	});
// });

// module.exports = router;