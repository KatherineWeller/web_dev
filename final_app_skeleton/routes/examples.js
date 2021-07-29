const express = require('express');
const router = express.Router();
const examples = require('../controllers/examples')
const catchAsync = require('../utils/catchAsync')
const Example = require('../models/example');
const Review = require("../models/review");
const { isLoggedIn, isOwner, validateExample } = require('../middleware');

router.route('/')
    .get(catchAsync(examples.index))
    .post(isLoggedIn, validateExample, catchAsync(examples.createExample))

router.get('/new', isLoggedIn, examples.renderNewForm);

router.route('/:id')
    .get(catchAsync(examples.showExample))
    .put(isLoggedIn, validateExample, catchAsync(examples.updateExample))
    .delete(isOwner, isLoggedIn, catchAsync(examples.deleteExample))

router.get('/:id/edit', isOwner, isLoggedIn, catchAsync(examples.renderEditForm))

module.exports = router;