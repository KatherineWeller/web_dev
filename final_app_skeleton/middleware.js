module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // store previous path to return to
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}

