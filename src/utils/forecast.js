const request = require('request');

const forecast = (address, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=8f156ac6bf83d1a15697e8288c3f74be&query=${address}`;

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `Weather: ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees Celsius out and feels like ${body.current.feelslike} degress Celsius.`)
        }
    });
};

module.exports = forecast;