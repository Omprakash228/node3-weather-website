const request = require('request');

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZGF2aW5jaTI1MSIsImEiOiJjanpoYnZwdjkwZGNhM2tueGJ4bXVtbTFlIn0.gNo5Fafr2nndiNV8l-4RHw`;

    request({url, json: true}, (error, { body })=>{
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(!body.features.length) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;