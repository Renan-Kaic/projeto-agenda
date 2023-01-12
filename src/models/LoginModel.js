const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    Email: { type: String, required: true },
    Senha: { type: String, required: true }
}
)


const LoginModel = mongoose.model('login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body

        this.errors = []
        this.user = null

    }

    async register(req, res) {
        this.valida()

        if (this.errors.length > 0) return

        await this.userExist()

        if (this.errors.length > 0) return


        const salt = bcrypt.genSaltSync()
        this.body.Senha = bcrypt.hashSync(this.body.Senha, salt)

        this.user = await LoginModel.create(this.body)
    }

    async login(req, res) {
        this.valida
        if (this.errors.length > 0) return

        this.user = await LoginModel.findOne({ Email: this.body.Email })

        if (!this.user) {
             this.errors.push('Usuário ou senha inválidos')
             this.user = null
             return
        }
        if (this.errors.length > 0) return


        if (!bcrypt.compareSync(this.body.Senha, this.user.Senha)) {
            this.errors.push('Usuário ou senha inválidos')
        }
    }

    async userExist() {
        const user = await LoginModel.findOne({ Email: this.body.Email })

        if (user) this.errors.push('Usuário já cadastrado')

    }

    valida() {
        console.log(this.body.Email, this.body.Senha)

        this.cleanUp()

        if (!validator.isEmail(this.body.Email)) this.errors.push('E-mail invalido')

        if (this.body.Senha.length < 8 || this.body.senha > 50) {
            this.errors.push('A senha deve ter mais de 8 caracteres e menos de 50.')
        }

    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body = ''
            }
        }

        this.body = {
            Email: this.body.Email,
            Senha: this.body.Senha
        }
    }
}

module.exports = Login