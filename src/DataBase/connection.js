// var util      = require('util');
// var mysql      = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'cadastro.cvhcnipsqecs.sa-east-1.rds.amazonaws.com',
//   user     : 'admin',
//   password : 'saladmin00',
//   database : 'DataBases',
//   port     : "3306"
// });

// module.exports = {

// 	//
// 	// Conecta com o banco de dados
// 	//
// 	openConnection: function openConnection(){
// 		connection.connect();
// 	},

// 	//
// 	// Executa Query
// 	//
// 	runQuery: function runQuery(sql, callback) {
// 		connection.query(sql, function(err, rows, fields) {
// 		  if (err){
// 		  	console.error(sql);
// 			throw err;
// 		  }
		
// 		  callback(err, rows, fields);
// 		});
// 	},
	
// 	//
// 	// TRUNCATE
// 	//
// 	truncateData: function truncateData(callback) {
// 		var sql = 'TRUNCATE `test`.`message`';
		
// 		this.runQuery(sql, callback.bind(this));
// 	},
		
// 	//
// 	// CREATE
// 	//
// 	createData: function createData(model, callback) {
// 		var sql = util.format('INSERT INTO `test`.`message` (id, text) VALUES (%s, \'%s\')', model.id, model.text);
		
// 		this.runQuery(sql, callback.bind(this));
// 	},
	
// 	//
// 	// READ
// 	//
// 	readData: function readData(callback) {
// 		var sql = 'SELECT id, text FROM `test`.`message`';
		
// 		this.runQuery(sql, callback.bind(this));
// 	},
	
	
// 	//
// 	// UPDATE
// 	//
// 	updateData: function updateData(model, callback) {
// 		var sql = util.format('UPDATE `test`.`message` set text = concat(text, \'123\') where id = %s', model.id);
		
// 		this.runQuery(sql, callback.bind(this));
// 	},
	
// 	//
// 	// DELETE
// 	//
// 	deleteData: function deleteData(model, callback) {
// 		var sql = util.format('DELETE FROM `test`.`message` where id = %s', model.id);
		
// 		this.runQuery(sql, callback.bind(this));
// 	},
	
// 	//
// 	// CLOSE CONNECTION
// 	//
// 	closeConnection: function closeConnection(model, callback) {
// 		connection.end();
// 	}	
// };