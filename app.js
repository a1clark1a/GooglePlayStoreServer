const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore.js");

const app = express();

app.use(morgan("common"));

app.get("/apps", (req, res) => {
  const { sort = "" } = req.query;
  const { genres = "" } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort.toLowerCase())) {
      return res.status(400).send("Sort must be either rating or app");
    }
  }

  if (genres) {
    if (
      !["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(
        genres.toLowerCase()
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'"
        );
    }
  }

  let filteredResults = playstore.filter(app => {
    return app.Genres.toLowerCase().includes(genres.toLowerCase());
  });

  if (sort) {
    filteredResults.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(filteredResults);
});

app.listen(8000, () => {
  console.log("PlayStore Server started on PORT 8000");
});
