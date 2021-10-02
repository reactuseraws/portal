const { isEmptyBindingElement } = require('typescript');

//FUNCAO: CONSULTAR USUÁRIO PELO ID (cdProduto)
exports.fcConsultarUserID = async (request, response) => {

  const mysql = require('mysql');
  const con = mysql.createConnection(
    { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxx", port : "3306" });
  
  con.connect(function(err) {});
  con.query(`SELECT emailUsuario, nmUsuario, tipoUsuario, situacaoUsuario FROM DataBases.usuario WHERE emailUsuario ='${request.params.email}'`, function(err, result, fields) {
    
    con.end();

    if (err) { return response.status(500).json(err);}

    if (result) {

      if ( Object.entries(result).length ===0 ) { return response.status(200).json({message: 'Usuário não cadastrado'})};
      return response.status(200).json(result);
    }

  });

};

//FUNCAO: CONSULTAR USUARIOS - LISTA DE TODOS OS USUÁRIOS
exports.fcConsultarUser = async (request, response) => {

const mysql = require('mysql');
const con = mysql.createConnection(
  { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxxx", port : "3306" });
con.connect(function(err) {});

con.query(`SELECT emailUsuario, nmUsuario, tipoUsuario, situacaoUsuario FROM DataBases.usuario`, function(err, result, fields) {
  con.end();

  if (err) { return response.status(500).json(err);}

  if (result) {return response.send(result); }
});

};

//FUNCAO: INCLUIR USUARIOS - INCLUSÃO INDIVIDUAL DE USUÁRIOS
exports.fcIncluirUser = async (request, response) => {

const mysql = require('mysql');
const con = mysql.createConnection(
  { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxxx", port : "3306" });
con.connect(function(err) {});

con.query(`INSERT INTO DataBases.usuario (emailUsuario, nmUsuario, senhaUsuario, clientID, tipoUsuario, situacaoUsuario) VALUES ('${request.body.emailUsuario}', '${request.body.nmUsuario}', '${request.body.senhaUsuario}', 'XYZ2021', 'C', 'P' )`, function(err, result, fields) {

  con.end();

  if (err) { return response.status(500).json(err);}

  //if (result) {return response.send(result); }
  var vclientID = "XYZ2021";
  if (result) { return response.status(200).json({ user: request.body.emailUsuario, clientID: vclientID});}

});

};

exports.validarUser = async (emailUser, senhaUser, clientID, callback) => {

    if (!emailUser) {
        retValidaUser = 'email não recebido.';
        callback(retValidaUser)
    };

    if (!senhaUser) {
      retValidaUser = 'senha não recebida.';
      callback(retValidaUser)
    };

    if (!clientID) {
      retValidaUser = 'ClientID não recebido.';
      callback(retValidaUser)
    };
  
    const mysql = require('mysql');
    const con = mysql.createConnection(
    { host : "xxxxxx.yyyyyy.sa-east-1.rds.amazonaws.com", user : "admin", password : "xxxxxxx", port : "3306" });
    
    con.connect(function(err) {});

    con.query(`SELECT clientID as CID, situacaoUsuario as SIT, senhaUsuario as SENHA FROM DataBases.usuario WHERE emailUsuario ='${emailUser}' `, function(err, result, fields) {
    
      if (err) { retValidaUser = 'Erro ao ler informações do usuário.'};

      con.end();

      console.log("item 01");
      //..não retornou registros
      if (result.length === 0) {
          retValidaUser = 'Usuário Não localizado.'
         };
      console.log("senha entrada");
      console.log(senhaUser);
      console.log("senha select");
      console.log(result[0].SENHA);
      console.log(result.length);

      //..usuário encontrato e clientID validado
      if (result.length === 1 && result[0].CID === "XYZ2021") {
          retValidaUser = 'Usuário validado.'
         };
      
      //..usuário encontrato e clientID diferente
      if (result.length === 1 && result[0].CID !== clientID) {
         retValidaUser = 'Client ID inválido.'
         };
      
      //..usuário encontrato e situação diferente de Ativo (usuário Inativo)
      if (result.length === 1 && result[0].SIT !== "A") {
         retValidaUser = 'Usuário inativo. Entre em contato com o Administrador'
      };

      //..usuário encontrato e clientID validado
      if (result.length === 1 && result[0].SENHA != senhaUser) {
        retValidaUser = 'Senha inválida.'
        };

      callback(retValidaUser);
        
    });
   
};  