const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b8c745cfa943763998cc457d41510a37/'
                 +latitude+','+longitude+'?units=si';        

    request({url, json : true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Weather Service', undefined);
        }else if(body.error){
             callback(body.error, undefined);
        }else{
            callback(undefined, body.daily.data[0].summary+ ` Its ${body.currently.temperature} degrees outside.
             The maximum temperature for the day will be ${body.daily.data[0].temperatureHigh} and the minimum temperature for the day will be ${body.daily.data[0].temperatureLow}`);
        }
    }); 
}


module.exports = forecast;