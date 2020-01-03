const request = require('request')
const StockRepo = require('../database/models/repository/StockRepo')
const gConfig = require('./config')

function bitcoinToEurSell() {
    const url = gConfig.gConfigParamByName("stock.updater.url.coinbase.btc.eur")
    request(url, { json: true }, (error, response, body) => {
        if (error === null) {
            let stockRepo = new StockRepo()
            stockRepo.create(body.data.base, body.data.amount, Date.now())
        } else {
            console.log(formatted_date + ' Error persisting data: ' + error)
        }
    })
}

exports.bitcoinToEurSell = bitcoinToEurSell