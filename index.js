const express = require('express');
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const app = new express();
const randomBackgroundLoader = require('./js/bg-loader')
const utils = require('./js/utils')
const stockUpdater = require('./js/stock-updater')
const stockRepo = require('./database/models/repository/StockRepo')
const cron = require("node-cron");
const gConfig = require("./js/config")
gConfig.gConfigInit()
const mongoDatabase = gConfig.gConfigParamByName("mongo.database")
mongoose.connect(mongoDatabase)

config({ cache: process.env.NODE_ENV === 'production' });

app.use(engine)
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)



app.get(['/', '\/index(\.html)?'], async (req, res) => {
    const backgroundUrl = await randomBackgroundLoader.loadRandomBackground()

    let repo = new stockRepo();
    let stockData = await repo.findByName('BTC')
    let stockNames = [{
        name: 'BTC'
    }]
    

    res.render('index', {
        backgroundUrl,
        stockData,
        stockNames,
        lastUpdate : utils.formatCustomDate(new Date())
    })
})



app.get('\/about(\.html)?', async (req, res) => {
    const backgroundUrl = await randomBackgroundLoader.loadRandomBackground()
    res.render('about', {
        backgroundUrl
    })
})

// schedule tasks to be run on the server   
let schedule = gConfig.gConfigParamByName("stock.update.cronexpression")
cron.schedule(schedule, function () {
    stockUpdater.bitcoinToEurSell()
});

let listenPort = gConfig.gConfigParamByName("port")
app.listen(listenPort, () => {
    console.log('App listening on port ' + listenPort);
})