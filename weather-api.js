const axios = require('axios');

const WEATHER_API_KEY = '51500855b1514a0aaff83611230904';

function getWeatherData(city) {
    const currentUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&units=metric`;
    const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3&units=metric`;
    const promises = [
        axios.get(currentUrl).then(response => {
            const data = response.data;
            delete data.current.condition.icon; // delete the icon property from current object
            return data;
        }).catch(error => console.error(error)),
        axios.get(forecastUrl).then(response => {
            const data = response.data;
            data.forecast.forecastday.forEach(day => {
                day.hour.forEach(hour => delete hour.condition.icon); // delete the icon property from each hour object in the hour array
                delete day.day.condition.icon; // delete the icon property from day object
            });
            return data;
        }).catch(error => console.error(error))
    ];
    return Promise.all(promises).then(([currentData, forecastData]) => ({
        current: currentData.current,
        forecast: forecastData.forecast
    })).catch(error => console.error(error));
}

module.exports = {
    getWeatherData
};