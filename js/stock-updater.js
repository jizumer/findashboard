const request = require('request')
const StockModel = require('../database/models/Stock')

function bitcoinToEurSell() {
    request('https://api.coinbase.com/v2/prices/BTC-EUR/sell', { json: true }, (error, response, body) => {
        if (error === null) {
            StockModel.create({
                name: body.data.base,
                value: body.data.amount,
                timestamp: Date.now()
            }, (error, stock) => {
                if (error === null) {
                    console.log('Successfully created stock ' + stock.name)
                }
                else {
                    console.log('Error: ' + error)
                }
            })
        } else {
            console.log('Error persisting data: ' + error)
        }

    });
}




exports.bitcoinToEurSell = bitcoinToEurSell