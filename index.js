const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Replace 'YOUR_API_KEY' with your actual Weatherstack API key
const WEATHERSTACK_API_KEY = "33016015c94e4a194c3b1bb43962a5ee";
const WEATHERSTACK_API_URL = `http://api.weatherstack.com/current/${city}`;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to fetch weather information
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(WEATHERSTACK_API_URL, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query: city
            }
        });

        const { data } = response;

        if (data.error) {
            return res.status(500).json({ error: data.error.info });
        }

        res.json({
            location: data.location.name,
            country: data.location.country,
            temperature: data.current.temperature,
            weather_descriptions: data.current.weather_descriptions,
            humidity: data.current.humidity,
            wind_speed: data.current.wind_speed,
            pressure: data.current.pressure
        });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Weather service running on http://localhost:${PORT}`);
});
