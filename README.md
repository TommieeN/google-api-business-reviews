# Place Details API

This is a simple Express.js application that uses the Google Places API to fetch and filter 5-star reviews with text for a specific place. It is designed to be deployed on a server to provide real-time review data.

## Features

- Fetches place details from the Google Places API
- Filters reviews to include only 5-star ratings with text
- Returns filtered reviews in JSON format

## Requirements

- Node.js (v14 or higher recommended)
- npm or yarn
- A Google API key with access to the Places API

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

## Install Dependencies

```bash
npm install
# or
yarn install
```

## Configure Environment Variables

Create a `.env` file in the root directory of the project with the following content:

```bash
GOOGLE_API_KEY=your-google-api-key
PLACE_ID=your-place-id
```

Replace `your-google-api-key` with your actualy Google API key and `your-place-id` with the place ID you want to query. (documentation here https://developers.google.com/maps/documentation/places/web-service/place-id)

## Run the Application

```bash
npm start
# or
yarn start
```

The server will start on 'http://localhost:3000' by default

## Access the API Endpoint

You can access the place details endpoint at:

```bash
http://localhost:3000/place-details
```

## Example Response

```json
[
  {
    "author": "John Doe",
    "rating": 5,
    "text": "Fantastic service, highly recommended!",
    "time": "2 weeks ago",
    "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14GjLd5XG3gdpEw1..."
  }
]
```
