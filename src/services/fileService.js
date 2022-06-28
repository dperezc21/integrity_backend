const { default: fetch } = require("cross-fetch");
const token = '';

class StockService {

    async getStockService(symbolStock) {
        try {
            const urlStock = `https://cloud.iexapis.com/stable/stock/${symbolStock}/quote?token=${token}`
            const urlLogo = `https://cloud.iexapis.com/stable/stock/${symbolStock}/logo?token=${token}`
            const response = await fetch(urlStock);
            const responseLogo = await fetch(urlLogo);
            if (response.status >= 400 || responseLogo.status >= 400 ) {
                throw new Error("Bad response from server");
            }
            const data = await response.json();
            const logo = await responseLogo.json();

            const {url} = logo;
            const { symbol, latestPrice, companyName } = data;
            return { symbol, latestPrice, companyName, url, statePrice:"" }
        } catch (error) {
            throw new Error(error)
        }
    }

   
}

module.exports = StockService