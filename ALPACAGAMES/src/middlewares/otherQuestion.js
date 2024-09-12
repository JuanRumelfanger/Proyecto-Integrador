function areNotYouLogged(req, res, next){
    if(!req.session.userAreLogged){
        res.redirect('/users/login')
    }
    next()
}
module.exports = areNotYouLogged