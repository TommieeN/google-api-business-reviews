const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv")
const app = express();
const port = process.env.port || 3000;

dotenv.config()

app.get("/place-details", async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY
    const placeId = process.env.PLACE_ID
    url = `https://maps.googleapis.com/maps/api/place/details/json?fields=reviews&place_id=${placeId}&key=${apiKey}`
    const response = await axios.get(url)

    const reviews = response.data.result.reviews;

    // Filter reviews for 5 star ratings and text
    const fiveStarReviewsWithText = reviews.filter(review => review.rating === 5 && review.text)

    const formattedResponse = fiveStarReviewsWithText.map(review => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.relative_time_description,
        profile_photo_url: review.profile_photo_url
    }))

    res.json(formattedResponse)
} catch (error) {
    console.error(error);
    res.status(500).send("an error occurred while fetching details")
}
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
