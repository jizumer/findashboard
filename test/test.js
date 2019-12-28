const mongoose = require('mongoose')
const StockModel = require('../database/models/Stock')
mongoose.connect('mongodb://192.168.56.102:27017/findashboard-test')


StockModel.create({
    name: 'sampleStock',
    value: '58',
    timestamp: Date.now()
}, (error, stock) => {
    if (error === null) {
        console.log('Successfully created stock ' + stock.name)
    }
    else {
        console.log('Error: ' + error)
    }
})

//find and update every record
StockModel.find({}, (error, stocks) => {
    if (error === null)
        updateStocks(stocks)
})

function updateStocks(stocks) {

    stocks.forEach(stock => {
        console.log('About to edit stock ' + stock._id)
        StockModel.findByIdAndUpdate(stock._id, {
            timestamp: Date.now()
        }, (error, editedstock) => {
            if (error === null) {
                console.log('Successfully edited stock ' + editedstock._id)
            } else {
                console.log('Error: ' + error)
            }
        })
    })
}