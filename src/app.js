var http = require('node:http');
var url = require('url');

const StockController = require('./controllers/stockController');

const {
  addStock, 
  deleteStock,
  getStocks,
  updateStockPrice
} = new StockController()



//create a server object:
http.createServer(async function (req, res) {

  res.writeHead(200, { "content-type": "application/json", 'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET' })
  const query = url.parse(req.url, true).query;
  const pathname = url.parse(req.url, true).pathname;
  if (pathname == "/updateStockPrice") {
    await updateStockPrice(res, query)
  } else if (pathname == "/getStocks") {
    getStocks(res);
  } else if (pathname == "/addStock") {
    await addStock(res, query)
  } else if (pathname == "/deleteStock") {
    deleteStock(res, query)
  }else{
    res.write("Not Found");
    res.end();
  }
  
}).listen(3000, () => console.log("corriendo en el puerto 3000")); //the server object listens on port 8080