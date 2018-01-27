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
  res.render("index", data);
  });
  
});


// router.get("/index", function(req, res) {
//   // Handlebars requires an object to be sent to the index handlebars file.

//   // 3. Loop through the animals, and send those that are not pets to the index handlebars file.
//   var data = {
//     anims: []
//   };

//   for (var i = 0; i < animals.length; i += 1) {
//     // Get the current animal.
//     var currentAnimal = animals[i];

//     // Check if this animal is a pet.
//     if (!currentAnimal.pet) {
//       // If not, push it into our data.anims array.
//       data.anims.push(currentAnimal);
//     }
//   }

//   res.render("index", data);
// });









module.exports = router;

