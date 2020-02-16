const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodes = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//public directopry path
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set handlebars as engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);  

//setting path of public directory
app.use(express.static(publicDirPath));

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Somanth'
    });
});

app.get('/help', (req, res) => {
      res.render('help', {
          title : 'Help',
          message : 'This is for your help. You Punk !',
          name: 'Somnath'
      });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Somnath'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
           error : 'Address must be provided'
       });
    }

    geocodes(req.query.address, (error, {latitude, longitude, location:placeName} = {}) => {
            if(error){
               return res.send({error});
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error });
                }
                    return res.send({
                        forecast : forecastData,
                        location : placeName,
                        address : req.query.address
                    });
                
            });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title : 'HELP',
        name : 'Somnath',
        message : 'Help article not found'
    });
});

app.get('*', function(req, res){
    res.render('404', {
        title : '404',
        name : 'Somnath',
        message : 'Page not found'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000');
});