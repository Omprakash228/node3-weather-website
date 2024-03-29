const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = 4200;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Omprakash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Omprakash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a sample help text',
        name: 'Omprakash'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(address, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }   
            res.send({location,forecastData,address})
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        error: "Help article not found",
        name: 'Omprakash'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Page Not Found',
        name: 'Omprakash'
    })
})

app.listen(port, () => { console.log("started")});