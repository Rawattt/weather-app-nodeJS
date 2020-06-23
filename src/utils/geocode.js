const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicjR3NHQiLCJhIjoiY2tib212MmlyMjJzMzMxbXkzanN1a3VsbiJ9.bJVEJBX4mmJMZLe0CCauvQ`

    request({url, json:true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to the location service', undefined)          
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined, {
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode:geocode,
}