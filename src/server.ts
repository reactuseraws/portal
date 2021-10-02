/*
AUTHOR: MARCELO F V NARDI
DATA..: 09/2021

GET     => BUSCAR UMA INFORMAÇÃO NA API
POST    => INSERIR UMA INFORMAÇÃO NA API
PUT     => ALTERAR UMA INFORMAÇÃO NA API
DELETE  => DELETAR UMA INFORMAÇÃO NA API
PATCH   => ALTERAR UMA INFORMAÇÃO ESPECÍFICA
*/

/*
TIPOS DE PARÂMETROS
ROUTES PARAMS => FAZEM PARTE DA ROTA  | LOCALHOST:3000/produtos/100200
QUERY PARAMS  => FAZER UM FILTRO      |  LOCALHOST:3000/produtos?name=teclados&descricao=sem fio -- não obrigatórios
BODY PARAMS   => MÉDITO POST/PUT/PATCH { "name": "teclado", "descricao": "sem fio"}
*/

import express from "express";
import bodyParser from "body-parser";

//..recursos para token JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

//..acesso as funcoes da aplicacao
const productController = require('./Funcoes/fcProdutos');
const groupController   = require('./Funcoes/fcGrupoProdutos');
const userController    = require('./Funcoes/fcUsuarios');
const tokenController   = require('./Funcoes/fcToken');

//..aplicacao
var cors = require('cors')
const app = express();
app.use(cors())

//..utilizacao do Json
var jsonParser = bodyParser.json()

//..funcao para validar o token de acesso
function verifyJWT(request, response, next){
  const token = request.headers['x-access-token'];
  if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    request.userId = decoded.id;
    next();
  });
};


app.get("/", (request, response) => {
  return response.send("Utilize /produtos/consultar  ou /produtos/incluir");
});

//...ROTA GERACAO DE TOKEN
app.post('/gerarToken', jsonParser, (request, response) => {
    tokenController.gerarToken (request, response);
});

//...ROTAS PRODUTOS
app.get("/produtos", (request, response) => {
    return response.send("Utilize /produtos/consultar  ou /produtos/incluir");
});

app.get("/produto/consultar", verifyJWT, (request, response) => {
    productController.fcConsultarProd (request, response); 
});

app.get("/produto/consultarteste", verifyJWT, (request, response) => {
    productController.fcConsultarProdteste (request, response); 
});

app.get("/produto/consultar/:id", verifyJWT, (request, response) => {
    productController.fcConsultarProdID (request, response);
});

app.post("/produto/incluir", jsonParser, verifyJWT, (request, response) => {
    productController.fcIncluirProd (request, response);
});

//...ROTAS GRUPOS DE PRODUTOS
app.get("/grupos", (request, response) => {
    return response.send("Utilize /grupoproduto/consultar  ou /grupoproduto/incluir");
});

app.get("/grupoproduto/consultar", verifyJWT, (request, response) => {
    groupController.fcConsultarGrupoProd (request, response); 
});

app.get("/grupoproduto/consultar/:id", verifyJWT, (request, response) => {
    groupController.fcConsultarGrupoProdID (request, response);
});

app.post("/grupoproduto/incluir", jsonParser, verifyJWT, (request, response) => {
    groupController.fcIncluirGrupoProd (request, response);
});

//...ROTAS USUARIOS
app.get("/usuarios", (request, response) => {
    return response.send("Utilize /usuarios/consultar  ou /usuarios/incluir");
});

app.get("/usuarios/consultar", verifyJWT, (request, response) => {
    userController.fcConsultarUser (request, response); 
});

app.get("/usuarios/consultar/:email", verifyJWT, (request, response) => {
    userController.fcConsultarUserID (request, response);
});

app.post("/usuarios/incluir", jsonParser, (request, response) => {
    userController.fcIncluirUser (request, response);
});

//...APLICACAO - EXECUCAO
app.listen( 3000, ()=> console.log("Server is Running"));