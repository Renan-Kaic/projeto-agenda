// Proteger as variaveis de ambiente
require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const routes = require('./routes');
const path = require('path');
const csrf = require('csurf')

//const helmet = require('helmet')

// Importando os middles
const { middleGlobal, CheckErrorCSURF, CSRFMiddle} = require('./src/middlewares/middle')

//app.use(csrf())

// conectando ao banco de dados

mongoose.set('strictQuery', false)
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('connected')
  })


// Guardando informações sobre a sessão no servidor

const session = require('express-session')
const mongoStore = require('connect-mongo')
const flash = require('connect-flash')

const sessionOption = session({
  secret: 'ksnaukshd85s57s54dkfddfhdsjsjjdr',
  store: mongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  }
})

app.use(sessionOption)
app.use(flash())


// Habilitando o express para tratar os formularios
app.use(express.urlencoded({ extended: true }));


// Habilitando para trabalhar com arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));


// Views 
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf())

// Middle 
app.use(middleGlobal)
app.use(CheckErrorCSURF)
app.use(CSRFMiddle)

app.use(routes)

app.on('connected', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
})

