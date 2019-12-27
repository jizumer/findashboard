const express = require('express');
const path = require('path');
const { config, engine } = require('express-edge')

const app = new express();

config({ cache: process.env.NODE_ENV === 'production' });

app.use(engine)
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)

app.get(['/', '\/index(\.html)?'], (req, res) => {
    res.render('index')
})
app.get('\/about(\.html)?', (req, res) => {
    res.render('about')
})
app.get('\/contact(\.html)?', (req, res) => {
    res.render('contact')
})
app.get('\/post(\.html)?', (req, res) => {
    res.render('post')
})
app.listen(4000, () => {
    console.log('App listening on port 4000');
})