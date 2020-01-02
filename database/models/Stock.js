const mongoose = require('mongoose')

//This is the structure of every document
const StockSchema = new mongoose.Schema({
    name: String,
    value: Number,
    timestamp: Date
})

//This is the collection
const Stock = mongoose.model('Stock', StockSchema)
module.exports = Stock