'use strict';
var mysql = require('mysql');

var Config = {

    get: mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jt'})
}

module.exports = Config