const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const { LoginRequirido} = require('./src/middlewares/middle')



// Rotas da home
route.get('/', LoginRequirido, homeController.index);


// Rotas login
route.get('/login/index', loginController.index)
route.post('/login/cadastro', loginController.registro)

route.post('/login/login', loginController.Login)
route.get('/login/logout', loginController.logout)

// Rotas contato
route.get('/contatos/index',LoginRequirido ,contatoController.index)
route.post('/contatos/cadastro',LoginRequirido, contatoController.cadastro)

route.get('/contato/editar/:id', LoginRequirido, contatoController.editarContatoIndx)
route.post('/contato/editar/:id', LoginRequirido, contatoController.editarContato)

route.get('/contato/delete/:id',  LoginRequirido, contatoController.deletarContato)
module.exports = route;
