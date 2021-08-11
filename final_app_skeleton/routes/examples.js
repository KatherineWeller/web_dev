const express = require('express');
const router = express.Router();
const examples = require('../controllers/examples');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isOwner, validateExample } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// routing to show all page 
router.route('/')
    .get(catchAsync(examples.index))
    .post(isLoggedIn, upload.array('image'), validateExample, catchAsync(examples.createExample))

// routing to new example page
router.get('/new', isLoggedIn, examples.renderNewForm);

// routing to show specific example pages
router.route('/:id')
    .get(catchAsync(examples.showExample))
    .put(isLoggedIn, isOwner, upload.array('image'), validateExample, catchAsync(examples.updateExample))
    .delete(isOwner, isLoggedIn, catchAsync(examples.deleteExample));

// routing to edit pages
router.get('/:id/edit', isOwner, isLoggedIn, catchAsync(examples.renderEditForm))

module.exports = router;