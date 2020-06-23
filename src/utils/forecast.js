const request = require('request')
const chalk = require('chalk')

const forecast = (long, lat, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&%20&appid=a6dc86ce0b34804aaa8b528eb97af8b6&units=metric`

    request({url, json:true}, (err,{body}) => {
        if(err){
                callback('Unable to connect to weather service!', undefined)
            } else if(body.message){
                callback('Unable to find location. Try again', undefined)
            }
            else{
                callback(undefined, {
                    description:body.daily[0].weather[0].description,
                    temperature:body.current.temp
                })
            }
    })

}

module.exports = {
    forecast:forecast
}