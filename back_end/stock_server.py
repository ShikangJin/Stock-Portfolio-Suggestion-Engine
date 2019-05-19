from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import pandas_datareader.data as web
from pandas_datareader import data
import time
from datetime import datetime, date, timedelta
app = Flask(__name__)
CORS(app)

@app.route("/stockprice", methods=[ 'GET' ])
def hello():
    symbol = request.args.get('symbol')
    prevSearching = 0
    res = []
    prevSearchingArr = [prevSearching]
    for i in range(5):
        res.append(searchWithSymbol(symbol, prevSearchingArr))
    return(jsonify(prices=res))


data_source = 'yahoo'

def searchWithSymbol(ticker, prevSearchingArr):
  global data_source 
  prevSearchingArr[0] += 1
  time = (date.today() - timedelta(days=prevSearchingArr[0])).strftime('%Y-%m-%d')
  start = time
  end = time
  try:
    url = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={}&region=1&lang=en".format(ticker)
    result = web.DataReader(ticker, data_source, start, end)
    stock_price = result.ix[start][3]
    price_change = result.ix[start][3] - result.ix[start][2]
    percentage_change = price_change / result.ix[start][2]
    # jsondata = jsonify(stock_price=stock_price, price_change=price_change,percentage_change=percentage_change)
    # return(jsondata)
    # return '{"stock_price": ' + '"' + ('%.2f' % stock_price) + '",' + '"price_change": ' + '"' + ('%.2f' % price_change) + '",' + '"percentage_change": ' + '"' + ('%.2f' % percentage_change) + '"}'
    return {"stock_price": ('%.2f' % stock_price), "price_change": ('%.2f' % price_change), "percentage_change": ('%.2f' % percentage_change), "time": start}
  except:
    if (prevSearchingArr[0] is 100):
      return
    return searchWithSymbol(ticker, prevSearchingArr)
