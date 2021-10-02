// //Rotina para acionar "por fora" a validação do token
// const xvalidarToken = require('./fcToken');
// var RetornoFuncao;
// const authHeader = request.headers['x-access-token'];
// xvalidarToken.validarToken(authHeader, function(RetornoFuncao) {
// rf = RetornoFuncao;
// console.log(rf);
// });

const { isEmptyBindingElement } = require('typescript');

//FUNCAO: CONSULTAR PRODUTOS PELO ID (cdProduto)
exports.fcConsultarProdID = async (request, response) => {

  const mysql = require('mysql');
  const con = mysql.createConnection(
    { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxxx", port : "3306" });
  
  con.connect(function(err) {});
  
  con.query(`SELECT * FROM DataBases.produto WHERE cdProduto =${request.params.id}`, function(err, result, fields) {
    
    con.end();

    if (err) { return response.status(500).json(err);}

    if (result) {

      if ( Object.entries(result).length ===0 ) { return response.status(200).json({message: 'Produto não cadastrado'})};
      return response.status(200).json(result);
    }

  });

};

//FUNCAO: CONSULTAR PRODUTOS - LISTA DE TODOS OS PRODUTOS
exports.fcConsultarProd = async (request, response) => {

const mysql = require('mysql');
const con = mysql.createConnection(
  { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxx", port : "3306" });
con.connect(function(err) {});

con.query(`SELECT * FROM DataBases.produto`, function(err, result, fields) {
  con.end();

  if (err) { return response.status(500).json(err);}

  if (result) {return response.send(result); }
});

};

//FUNCAO: CONSULTAR PRODUTOS - LISTA DE TODOS OS PRODUTOS
exports.fcConsultarProdteste = async (request, response) => {

  const mysql = require('mysql');
  const con = mysql.createConnection(
    { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxxx", port : "3306" });
  con.connect(function(err) {});
  
  con.query(`SELECT * FROM DataBases.produto`, function(err, result, fields) {
    con.end();
  
    if (err) { return response.status(500).json(err);}
  
    if (result) {

      const rrresponse = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Acccess-Test": "TESTE-DE-ACESSO"
        }
//        body: JSON.stringify(result),

    };

    //console.log("retun response");
    //console.log(rrresponse);
    //console.log("antes result");
    //console.log(json(result));
    //console.log("depois result");
    return response.status(200).header(rrresponse).json(result);
    response.status(200).h
    
    }
  });
  
  };

//FUNCAO: INCLUIR PRODUTOS - INCLUSÃO INDIVIDUAL DE PRODUTOS
exports.fcIncluirProd = async (request, response) => {

const mysql = require('mysql');
const con = mysql.createConnection(
  { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxx", port : "3306" });
con.connect(function(err) {});

con.query(`INSERT INTO DataBases.produto (cdProduto, nmProduto, qtEstoque, qtMinEstoque) VALUES (${request.body.cdProduto}, '${request.body.nmProduto}', ${request.body.qtEstoque} ,${request.body.qtMinEstoque})`, function(err, result, fields) {

  con.end();

  if (err) { return response.status(500).json(err);}

  if (result) {return response.send(result); }

});

}