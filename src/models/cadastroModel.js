const mongoose = require('mongoose')

const cadastroSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    user: {type: String, required: true}
})

const CadastroModel = mongoose.model('Cadastro', cadastroSchema)

module.exports = CadastroModel