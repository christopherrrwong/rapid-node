const express = require('express');
const {
    getWeatherData
} = require('./weather-api');

const app = express();
const port = 3000;

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    getWeatherData(city)
        .then(data => res.json(data))
        .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});