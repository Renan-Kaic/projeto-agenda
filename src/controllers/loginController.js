const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if (req.session.user) return res.render('user-logado')

    res.render('login')    
}


exports.registro = async (req, res) => {

    try{
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)

            req.session.save(() => {
                return res.redirect('back')
            })


            return
        }
        
        else {
            req.flash('sucesso', 'Seu usuário foi criado com sucesso.');

            req.session.save( () => {
                return res.redirect('back')
            })

            return
        }

    } catch (e) {
        console.log(e)

        res.render('404')
    }
}

exports.Login = async (req, res) => {

    try{
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)

            req.session.save(() => {
                return res.redirect('back')
            })

            return
        }

        
        
        else {
            req.flash('sucesso', 'Login realizado com sucesso.');
            req.session.user = login.user
            req.session.save( () => {
                return res.redirect('/')
            })

            return
        }

    } catch (e) {
        console.log(e)

        res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy()

    res.redirect('/login/index')
}