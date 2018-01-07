var connection = require("../config/connection.js");

function objToSql(ob) {
  var arr = [];

 
  for (var key in ob) {
    var value = ob[key];
    
    if (Object.hasOwnProperty.call(ob, key)) {
      
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  }

  
  return arr.toString();
}



var orm = {
	selectAll: function(table,cb){
		var queryString = "SELECT * FROM " + table + ";";
		connection.query(queryString, function(err, res){
			if(err) throw err;
			cb(res);

		});
	},
	insertOne: function(table, col, val, cb){
		var queryString = "INSERT INTO " + table;
		queryString += " (" + col + ") ";
		queryString += "VALUES ";
		queryString += "('";
		queryString += val;
		queryString += "')";
		console.log(queryString);
		connection.query(queryString, val, function(err, res){
			if(err) throw err;
			cb(res);
		});

	},
	updateOne: function(table, objColVals, condition, cb){
		 var queryString = "UPDATE " + table;

		    queryString += " SET ";
		    queryString += objToSql(objColVals);
		    queryString += " WHERE id = ";
		    queryString += condition;

		    console.log(queryString);
		    connection.query(queryString, function(err, result) {
		      if (err) {
		        throw err;
		      }

		      cb(result);
		    });
	}
};

module.exports = orm;