const request = require('request')
const StockModel = require('../database/models/Stock')
const gConfig = require('./config')

function bitcoinToEurSell() {
    const url = gConfig.gConfigParamByName("stock.updater.url.coinbase.btc.eur")
    request(url, { json: true }, (error, response, body) => {
        if (error === null) {
            StockModel.create({
                name: body.data.base,
                value: body.data.amount,
                timestamp: Date.now()
            }, (error, stock) => {
                let current_datetime = new Date()
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
                if (error === null) {

                    console.log(formatted_date + ' Successfully created stock ' + stock.name)
                }
                else {
                    console.log(formatted_date + ' Error: ' + error)
                }
            })
        } else {
            console.log(formatted_date + ' Error persisting data: ' + error)
        }

    });
}




exports.bitcoinToEurSell = bitcoinToEurSell