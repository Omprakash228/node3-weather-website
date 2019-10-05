const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/a551772e526b95e194f8b1d9a38a3b4f/${latitude},${longitude}`;

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    });
};

module.exports = forecast;