const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index', {
        name:'Shubham Rawat',
        title:'Type in the address to find the weather'
    })
})
app.get('/home', (req,res) => {
    res.render('index', {
        name:'Shubham Rawat',
        title:'Weather'
    })
})
app.get('/contact', (req,res) => {
    res.render('contact', {
        name:'Shubham Rawat',
        title:'Contact',
        email:'rawatrajput7@gmail.com'
    })
})


app.get('/about', (req, res) => {
    res.render('About', {
        title:'About the website',
        name:'Shubham Rawat',
        about:'This is a basic weather application built using node.js. It uses openweathermap and mapbox api to fetch location and waether data'
    })
})
app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error:'Please enter address'
        })
    }
    const tmp = {}
    geocode.geocode(req.query.address, (error, {longitude, latitude, location} = tmp) => {
        if(error){
            res.send({error:'Unable to find the location. Try again'})
        }
        else{
            forecast.forecast(longitude, latitude , (error, {description, temperature}) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    description,
                    temperature,
                    address:req.query.address
                })
            })
        }
    })


    
})

app.get('*', (req, res) => {
    res.render('404', {
        name:'Shubham Rawat',
        title:'This is a title',
        error:'404 not found'
    })
})

app.listen(port, () => console.log(`Server is up at port ${port}`))