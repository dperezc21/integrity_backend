const FileService = require('../services/fileService');
const Utils = require('../utils/utils');

const { getStockService } = new FileService()
const { saveStock, readFileStocks, updatePrice } = new Utils()

class StockController {

    async deleteStock (res, query) {
        const { symbol } = query;
        let result = false;
        let stocks = JSON.parse(readFileStocks());
        for (const iterator in stocks) {
            if(iterator == null) continue
            for (const key in stocks[iterator]) {
                if (stocks[iterator]["symbol"] == symbol) {
                    delete stocks[iterator];
                    saveStock(JSON.stringify(stocks));
                    result = true
                    break;
                }
            }
        }

        res.write(JSON.stringify(result));
        res.end();
    }

    getStocks(res) {
        try {
            let stocks = JSON.parse(readFileStocks());
            res.write(JSON.stringify(stocks));
            res.end();
        } catch (error) {
            console.log(error)
        }
    }

    async addStock (res, query) {
        try {
            let { symbol } = query
            let result = true;
            const getStock = await getStockService(symbol);
            const stocks = JSON.parse(readFileStocks());


            if (stocks.length > 0) {
                for (const iterator of stocks) {
                    if(iterator == null) continue;
                    if (getStock.symbol == iterator.symbol) {
                        result = false;
                        break;
                    }
                }
            }

            if (result) {
                stocks.push(getStock);
                saveStock(JSON.stringify(stocks))
            } else {
                updatePrice(stocks, getStock, result)
            }
            res.write(JSON.stringify(result));
            res.end()
        } catch (error) {
            console.log(error)
        }
    }

    async updateStockPrice  (res, query) {

        try {
            const { symbol } = query
            let getStock = await getStockService(symbol);
            let stocks = JSON.parse(readFileStocks());
            let result = false;
            result = updatePrice(stocks, getStock, result);
            console.log(result)
            res.write(JSON.stringify(result))
            res.end(); //end the response

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = StockController