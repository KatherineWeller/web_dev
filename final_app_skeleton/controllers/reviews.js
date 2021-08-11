const Example = require('../models/example');
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
    const example = await Example.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    example.reviews.push(review);
    await review.save();
    await example.save();
    req.flash('success', 'Successfully posted review.');
    res.redirect(`/examples/${example._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Examples.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/examples/${id}`);
}