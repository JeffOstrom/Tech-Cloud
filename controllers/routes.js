var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// Requiring our Note and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");


//GET request to scrape Techcrunch website
router.get("/", function(req, res) {
	   console.log("request to my server at /");
//First, we grab the body of the html with request
  request("https://techcrunch.com", function(error, response, html) {
       console.log("request to techcrunch");
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("li.river-block div.block-content").each(function(i, element) {
         console.log('Articles');
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("h2.post-title").text();
      result.summary = $(this).children("p.excerpt").text();
      result.link  = $(this).children("h2.post-title").children("a").attr("href");
         console.log(result);
      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);
         console.log(entry);
      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log("it saved");
        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  res.render("index");
});

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
	// Route to see what user looks like WITH populating
// app.get("/populateduser", function(req, res) {
//   // Prepare a query to find all users..
//   User.find({})
//     // ..and on top of that, populate the notes (replace the objectIds in the notes array with bona-fide notes)
//     .populate("notes")
//     // Now, execute the query
//     .exec(function(error, doc) {
//       // Send any errors to the browser
//       if (error) {
//         res.send(error);
//       }
//       // Or send the doc to the browser
//       else {
//         res.send(doc);
//       }
//     });
// });





// router.post("/savecomments", function(req,res){

// 	//incoming data req.body


// 	// Look into 19.Populated-Exercise activity server.js line ~96 "app.post("/submit" ..." route.
	
// 	// in a post request incomming data (from front end) is in req.body
// 	res.redirect("/");

// });



// router.post("/deletecomments", function(req,res){

// 	res.redirect("/");

// });




module.exports = router;

