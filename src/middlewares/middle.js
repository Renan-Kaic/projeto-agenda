exports.middleGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.sucesso = req.flash('sucesso')
    res.locals.user = req.session.user

    next()
}


exports.CheckErrorCSURF = (err, req, res, next) => {
    if (err) {
        return res.render('404')
    }

    next()
}

exports.CSRFMiddle = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();

    next()
} 


exports.LoginRequirido = (req, res, next) => {

    if (!req.session.user) {
        req.flash('errors', 'E necessário fazer o login')
        req.session.save(() => res.redirect('/login/index'))

        return
    }
    
    next()

}