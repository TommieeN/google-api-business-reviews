const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
dotenv.config();

app.use(cors());

// Load reviews from reviews.json
const reviews = JSON.parse(fs.readFileSync("./reviews.json", "utf8"));

app.get("/place-details", (req, res) => {
  try {

    const formattedResponse = reviews.map(review => ({
      author: review.author_name,
      rating: Number(review.rating),
      text: review.text,
      time: review.time,  
      profile_photo_url: review.image_url, 
    }));

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing the reviews");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
