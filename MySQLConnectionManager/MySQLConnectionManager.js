var mysql = require('mysql');


var pool = mysql.createPool({
        connectionLimit : 10, 
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'movie',
        debug    :  false
    });


module.exports = pool