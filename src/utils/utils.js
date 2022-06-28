const path = require('path');

const {readFileSync, writeFile} = require('fs')

const pathFile = path.join(__dirname + '/stocks.json')


class Utils {

    saveStock(data) {
        writeFile(pathFile, data, 'utf8', (error) => {
            if (error) thow("Error al escribir en el archivo")
            console.log("datos guardados")
        })

    }
    updatePrice(stocks, getStock, result) {
        for (const iterator in stocks) {
            if(iterator == null) continue;
            for (const key in stocks[iterator]) {
                if (stocks[iterator]["symbol"] == getStock["symbol"]) {
                    if (stocks[iterator]["latestPrice"] > getStock["latestPrice"]) {
                        getStock["statePrice"] = "-"
                        result = true
                    } else if (stocks[iterator]["latestPrice"] < getStock["latestPrice"]) {
                        getStock['statePrice'] = '+'
                        result = true
                    } else if (stocks[iterator]["latestPrice"] == getStock["latestPrice"]) {
                        getStock['statePrice'] = '='
                    }
                    stocks[iterator] = getStock
                    break;
                }
            }
        }
        
        return result;
    }


    readFileStocks() {
        const data = readFileSync(pathFile, "utf-8");
        return data
    }
    
}


module.exports = Utils