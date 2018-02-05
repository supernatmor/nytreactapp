const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});




//GET route for loading main page - does nothing at this time
app.get("/", (req, res) => {
    //do nothing special, just load the page
})

//GET route for pulling news from Washington Post
app.get("/search", (req, res) => {
    request("https://www.washingtonpost.com/", (err, resp, html) => {
        //loads html of page into cheerio then saves to $ for access later    
        const $ = cheerio.load(html);

        $("div.headline").each((i, element) => {

            let result = {};
            //console.log($(element).children().attr("html"));
            result.title = $(element).text();

            result.link = $(element).find("a").attr("href");

            // result.summary = $(element).children(".blurb").text();

            //console.log(result);
            if (result.title && result.link) {
                console.log("ding");//dings when properly scraped
                db.Article
                    .create(result)
                    .then(function (dbArticle) {
                        // If we were able to successfully scrape and save an Article, send a message to the client
                        console.log("Scrape Complete");
                        res.json(result);
                    })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    console.log(err);
                })
            } else {
                console.log("buzzer");//buzzer when not properly scraped
            }

        })

    })
})

//GET route to retrieve all the articles
app.get("/articles"), (req, res) => {
    db.Article.find({})
        .then((articles) => {
            res.json(articles)
        })
}

app.listen(PORT);