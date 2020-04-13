var mysql = require('mysql');

var machineNames = ['Svarv', 'Bandsåg', 'Bordsåg', 'CNC-fräs']

//Tag ids that are authorized to start machines
var tagIds = [];

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

//Get tag ids from DB that are authorized
var updateDbUserTagIds = function() {
  console.log('MOCK: Get user tag IDs from DB');
}

var checkIfTagIdIsAuthorized = function(tagId) {
  return true;
}

//Update tag id once every minute
setInterval(function(){
  updateDbUserTagIds();
}, 60000);

//Update user tag Id's when app starts
updateDbUserTagIds();

// con.query(createDbSql, createDbCallback);

exports.getTagIdSql = getTagIdSql;
exports.getTagIdCallback = getTagIdCallback;
exports.machineNames = machineNames;
exports.checkIfTagIdIsAuthorized = checkIfTagIdIsAuthorized;