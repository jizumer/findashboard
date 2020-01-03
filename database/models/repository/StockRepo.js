const StockModel = require('../Stock')
const utils = require('../../../js/utils')
class StockRepo {

    create(name, value, timestamp) {
        return StockModel.create({
            name: name,
            value: value,
            timestamp: timestamp
        }, (error, stock) => {
            let current_datetime = new Date()
            let formatted_date = utils.formatCustomDate(current_datetime)
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
                    labels[i] = utils.formatCustomDate(values[i].timestamp)
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