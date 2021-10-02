//FUNCAO: CONSULTAR PRODUTOS PELO ID (cdProduto)
exports.fcConsultarGrupoProdID = async (request, response) => {

  const mysql = require('mysql');
  const con = mysql.createConnection(
    { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxx", port : "3306" });
  
  con.connect(function(err) {});

  con.query(`SELECT * FROM DataBases.grupoproduto WHERE cdGrupoProduto =${request.params.id}`, function(err, result, fields) {
    
    con.end();


    if (err) { return response.status(500).json(err);}

    if (result) {

      if ( Object.entries(result).length ===0 ) { return response.status(200).json({message: 'Grupo não cadastrado'})};
      return response.status(200).json(result);
    }

  });

};

//FUNCAO: CONSULTAR PRODUTOS - LISTA DE TODOS OS PRODUTOS
exports.fcConsultarGrupoProd = async (request, response) => {

const mysql = require('mysql');
const con = mysql.createConnection(
  { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxxxx", port : "3306" });

  con.connect(function(err) {});

  con.query(`SELECT * FROM DataBases.grupoproduto`, function(err, result, fields) {
    con.end();

    if (err) { return response.status(500).json(err);}  
    
    if (result) {
      if (result === '[]') {
        console.log("Não foram encontrados registros para a condição informada");
      }
      return response.send(result);
    }
  });

};

//FUNCAO: INCLUIR PRODUTOS - INCLUSÃO INDIVIDUAL DE PRODUTOS
exports.fcIncluirGrupoProd = async (request, response) => {

const mysql = require('mysql');
const con = mysql.createConnection(
  { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxx", port : "3306" });
con.connect(function(err) {});

con.query(`INSERT INTO DataBases.grupoproduto (cdGrupoProduto, nmGrupoProduto ) VALUES (${request.body.cdGrupoProduto}, '${request.body.nmGrupoProduto}')`, function(err, result, fields) {

  con.end();

  if (err) { return response.status(500).json(err);}

  if (result) {
    return response.send(result);
  }
});

}