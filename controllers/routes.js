var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// Requiring our Note and Article models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");


//GET request to scrape Techcrunch website
router.get("/", function(req, res) {
//First, we grab the body of the html with request
  request("https://techcrunch.com", function(error, response, html) {
      var data = {
        articles: [],
      }
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
      
      data.articles.push(entry);
      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          // console.log("it saved");
        }
      });

    });
    // Tell the browser that we finished scraping the text
    // Grab every doc in the Articles array
  Article.find({}).limit(15)
  .populate("note")
  .exec(function(error, articles) {

      res.render('index', {articles:articles});
    })
  });
});

// New note creation via POST route
router.post("/comment/:id", function(req, res) {
  // Use our Note model to make a new note from the req.body
  var newNote = new Note(req.body);
  // Save the new note to mongoose
  newNote.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise
    else {
      // Find our user and push the new note id into the User's notes array
      Article.findOneAndUpdate({"_id":req.params.id}, { $push: { "note": doc._id } }, { new: true }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          res.redirect("/");
        }
      });
    }
  });
});

//Delete comment
router.post("/deletecomment/:noteid/:articleid", function(req, res) {
  // Use our Note model to make a new note from the req.body
  Note.remove({"_id":req.params.noteid}, function(err, doc){

    if (err) {
      res.redirect("/");
     }

     Article.findOneAndUpdate({"_id":req.params.articleid}, { $pull: { "note": doc._id } }, { new: true })
     .exec(function(err, doc){
        // Send any errors to the browser
        if (err) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          res.redirect("/");
        }
      });


  });
      // Find our user and push the new note id into the User's notes array
      // Article.findOneAndUpdate({"_id":req.params.id}, { $push: { "note": doc._id } }, { new: true }, function(err, newdoc) {
      //   // Send any errors to the browser
      //   if (err) {
      //     res.send(err);
      //   }
      //   // Or send the newdoc to the browser
      //   else {
      //     res.redirect("/");
      //   }
      // });
});







module.exports = router;

