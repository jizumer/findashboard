const StockModel = require('../Stock')
const formatCustomDate = (dateToFormat) => {
    return dateToFormat.getFullYear()
        + "-" + (dateToFormat.getMonth() + 1)
        + "-" + dateToFormat.getDate() + " "
        + dateToFormat.getHours() + ":"
        + dateToFormat.getMinutes()
        + ":" + dateToFormat.getSeconds()
}
class StockRepo {

    create(name, value, timestamp) {
        return StockModel.create({
            name: name,
            value: value,
            timestamp: timestamp
        }, (error, stock) => {
            let current_datetime = new Date()
            let formatted_date = formatCustomDate(current_datetime)
            if (error === null) {
                console.log(formatted_date + ' Successfully created stock ' + stock.name)
            }
            else {
                console.log(formatted_date + ' Error: ' + error)
            }
        })
    }

    findByName(stockName) {
        return StockModel.find({ name: stockName })
            .select('value timestamp')
            .sort('-timestamp')
            .then((values) => {
                let labels = []
                let amounts = [];
                for (let i = 0; i < values.length; i++) {
                    labels[i] = formatCustomDate(values[i].timestamp)
                    amounts[i] = values[i].value
                }
                let data = []
                data['labels'] = labels
                data['values'] = amounts
                return data

            })
    }

}

module.exports = StockRepo