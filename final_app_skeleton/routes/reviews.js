const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const Review = require("../models/review");
const Example = require('../models/example');
const  { validateReview, isLoggedIn, isReviewOwner } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isReviewOwner, isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router;