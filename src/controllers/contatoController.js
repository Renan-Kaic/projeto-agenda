const { contentSecurityPolicy } = require('helmet')
const { contato, buscarContatos, deletar } = require('../models/contatoModel')


exports.index = (req, res) => {
    
    res.render('contatos')
}

exports.cadastro = async (req, res) => {

    try {

        const contatos = new contato(req.body)

        const id = req.session.user._id
        await contatos.cadastro(id)

        if (contatos.errors.length > 0) {
            req.flash('errors', contatos.errors)
            print('veio aqui')
            req.session.save(() => res.redirect('back'))
            return
        }

        req.flash('sucesso', 'Contato cadastrado com sucesso!')
        req.session.save(() => res.redirect('back'))
        return 
    } catch (e) {
        console.log(e)

        res.render('404')
    }
}

var idContato
exports.editarContatoIndx = async (req, res) => {
    if (!req.params.id) return res.render('404')


    const contato = await buscarContatos(req.params.id, true)

    contato.ID = req.params.id
    idContato = req.params.id
    if (!contato) return res.render('404')

    res.render('editar', { contato })
}

exports.editarContato = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        
        const contatos = new contato(req.body);
    
    
        await contatos.editar(idContato, req.session.user._id);
        

        if(contatos.errors.length > 0) {

          req.flash('errors', contato.errors);
          req.session.save(() => res.redirect('back'));
          return;
        }

    
        req.flash('sucesso', 'Contato editado com sucesso.');

        req.session.save(() => res.redirect(`back`));
        return;

      } catch(e) {
        console.log(e);
        res.render('404');
      }
}

exports.deletarContato = async (req, res) => {
    if (!req.params.id) return res.render('404')

    const contatos = deletar(req.params.id)

    if (!contato) return res.render('404')

    req.flash('sucesso', 'Contato apagado com sucesso')

    req.session.save(() => res.redirect('back'))

    return
}