const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv")
const app = express();
const port = process.env.port || 3000;
const cors = require("cors")

dotenv.config()

app.use(cors())
app.get("/place-details", async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY
    const placeId = process.env.PLACE_ID
    url = `https://maps.googleapis.com/maps/api/place/details/json?fields=reviews&place_id=${placeId}&key=${apiKey}`
    const response = await axios.get(url)
    const reviews = response.data.result.reviews;

    // Filter reviews for 5 star ratings and text
    const fiveStarReviewsWithText = reviews
    .filter(review => review.rating === 5 && review.text)
    .sort((a, b) => new Date(b.time) - new Date (a.time))

    const formattedResponse = fiveStarReviewsWithText.map(review => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.relative_time_description,
        profile_photo_url: review.profile_photo_url,
        google_listing: `https://www.google.com/maps/place/?q=place_id:${placeId}`
    }))

    res.json(formattedResponse)
} catch (error) {
    console.error(error);
    res.status(500).send("an error occurred while fetching details")
}
});

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
