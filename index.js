const express = require('express');
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const app = new express();
const randomBackgroundLoader = require('./bg-loader')
mongoose.connect('mongodb://192.168.56.102:27017/findashboard')

config({ cache: process.env.NODE_ENV === 'production' });



app.use(engine)
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)


app.get(['/', '\/index(\.html)?'], async (req, res) => {
    const backgroundUrl = await randomBackgroundLoader.loadRandomBackground()
    res.render('index', {
        backgroundUrl
    })
})
app.get('\/about(\.html)?', async (req, res) => {
    const backgroundUrl = await randomBackgroundLoader.loadRandomBackground()
    res.render('about', {
        backgroundUrl
    })
})

app.listen(4000, () => {
    console.log('App listening on port 4000');
})