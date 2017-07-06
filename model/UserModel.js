var mysql = require("mysql");
var con=require('./config');

var _connection = con.get;

var data='';

_connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  _connection.query("SELECT * FROM tbl_users", function (err, result, fields) 
   {
    if (err) throw err;
    data=result;
    
  });

  console.log('Connection established');
});

module.exports = data