const ExpressError = require('./utils/ExpressError');
const { exampleSchema, reviewSchema } = require('./schemas.js')
const Example = require('./models/example');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // store previous path to return to
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isOwner = (req, res, next) => {
    const { id } = req.params;
    const example = await example.findById(id);
    if(!example.author.equal(req.user._id)){
        req.flash('error', 'You do not have permission to do that.');
        return res.redirect(`/examples/${id}`)
    }
    next();
}

module.exports.isReviewOwner = (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equal(req.user._id)){
        req.flash('error', 'You do not have permission to do that.');
        return res.redirect(`/examples/${id}`)
    }
    next();
}

module.exports.validateExample = (req, res, next) => {
    const { error } = exampleSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
