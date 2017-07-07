var Logger = require('bunyan');
var strftime = require('strftime')

var cur_date=strftime('%d-%m-%Y');
/* Logger */
var log = Logger.createLogger({
  name: 'restify',
  streams: [{ path: 'F:/Projects/Node/restify/logs/restify-'+cur_date+'.log'}]});

module.exports = log