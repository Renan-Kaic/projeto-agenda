const { render } = require('ejs')
const mongoose = require('mongoose')
const validator = require('validator')


const contatoSchema = new mongoose.Schema({
    Nome: { type: String, required: true },
    Sobrenome: { type: String, required: false, default: '' },
    Telefone: { type: String, required: true },
    Email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
    idAccount: { type: String, required: true }
})

const contatoModel = mongoose.model('contato', contatoSchema)


class contato {
    constructor(body) {
        this.body = body
        this.ID = null
        this.errors = []
        this.contato = null
    }

    async cadastro(id) {
        this.ID = id
        this.valida()

        if (this.errors.length > 0) return

        this.body.idAccount = id
        this.contato = await contatoModel.create(this.body)
    }

    valida() {

        console.log(this.body.Nome, this.body.Sobrenome, this.body.Telefone, this.body.Email)
        if (!validator.isEmail(this.body.Email) && this.body.Email) this.errors.push('Email invalido')
        if (!this.body.Nome) this.errors.push('Nome e um campo obrigatório')

        if (!this.body.Telefone && !this.body.Email) {
            this.errors.push('O contato deve ter ao menos o telefone ou email cadastrados')
        }

    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            Nome: this.body.Nome,
            Sobrenome: this.body.Sobrenome,
            Telefone: this.body.Telefone,
            Email: this.body.Email,
            idAccount: this.ID
        }

    }

    async editar(id, UserID) {
      
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.body.idAccount = UserID
        this.contato = await contatoModel.findByIdAndUpdate(id, this.body, {new: true});


    }



}

const buscarContatos = async (id, editar = false) => {

    if (editar) {
        const contatos = await contatoModel.findById(id)

        return contatos
    }
    const contatos = await contatoModel.find({ idAccount: id })
        .sort({ criadoEm: -1 })

    return contatos
}

const deletar = async (id) => {
    if (typeof id != 'string') return

    const contato = contatoModel.findByIdAndDelete({_id: id})
    
    return contato
}
module.exports = { contato, buscarContatos, deletar }
