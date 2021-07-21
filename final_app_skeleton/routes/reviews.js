const express = require('express');
const router = express.Router( { mergeParams: true } );
const catchAsync = require('../utils/catchAsync')
const Review = require("../models/review")
const Example = require('../models/example');
const ExpressError = require('../utils/ExpressError')
const { reviewSchema } = require('../schemas.js')

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const example = await Example.findById(req.params.id);
    const review = new Review(req.body.review);
    example.reviews.push(review);
    await review.save();
    await example.save();
    req.flash('success', 'Successfully posted review.');
    res.redirect(`/examples/${example._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    Examples.findByIdAndUpdate(id, {$pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted reivew.');
    res.redirect(`/examples/${id}`);
}))

module.exports = router;