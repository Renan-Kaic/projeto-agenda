const { buscarContatos } = require('../models/contatoModel')


exports.index = async (req, res) => {
    const id = req.session.user._id
    const contatos = await buscarContatos(id)


    if (contatos.length == 0) {
        req.flash('sucesso', 'Não existem contatos cadastrados ainda.')

        req.session.save(() => res.render('index', { contatos }))
        return
    }
    res.render('index', { contatos })
}