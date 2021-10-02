require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

exports.gerarToken = async (request, response) => {

const vvalidarUser = require('./fcUsuarios');
var RetornoFuncao;

const emailUser = request.body.user
const senhaUser = request.body.password

const clientID = request.headers['clientid'];

vvalidarUser.validarUser(emailUser, senhaUser, clientID, function(RetornoFuncao) {
retFunc = RetornoFuncao;

if (retFunc === 'Usuário validado.') {
    //auth ok
    const token = jwt.sign({ clientID }, process.env.SECRET, {
      expiresIn: 6000 // expires in 5min
    });
    return response.json({ auth: true, token: token });
  }
  
  //..erro na validação do usuário (retorno da funcao ValidarUser)
  response.status(500).json({message: retFunc });

});
};

exports.validarToken = async (itoken, callback) => {

    const token = itoken;
    if (!token) {
      retValidToken = 'No token provided.';
      callback(retValidToken)
    };
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) { 
        retValidToken = 'Failed to authenticate token.';
        callback(retValidToken);
      }
      else
      {
        // se tudo estiver ok, salva no request para uso posterior
        const userId = decoded.id;
        retValidToken = 'Token success.';
        callback(retValidToken);
      }
    });
  };  