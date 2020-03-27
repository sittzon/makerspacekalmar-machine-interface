var mysql = require('mysql');

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "testPass"
});

con.connect(function(err) {
  // if (err) throw err;
  console.log("Connected to "+con.host);
});

var getTagIdSql = 'SELECT TAGID FROM USERS;';
var getTagIdCallback = function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
}

var createDbSql = 'CREATE TABLE USERS (USERID INT, TAGID INT);';
var createDbCallback = function (err, result) {
    if (err) throw err;
    console.log("Table Created");
}

// con.query(createDbSql, createDbCallback);

exports.getTagIdSql = getTagIdSql;
exports.getTagIdCallback = getTagIdCallback;
exports.machineNames = machineNames;