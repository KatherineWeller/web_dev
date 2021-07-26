const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError');
const Example = require('../models/example');
const Review = require("../models/review");
const { exampleSchema } = require('../schemas.js')
const isLoggedIn = require('../middleware');


const validateExample = (req, res, next) => {
    const { error } = exampleSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/examples', catchAsync(async (req, res) => {
    const examples = await Example.find({});
    res.render('examples/index', { examples })
}));

router.get('/new', isLoggedIn, (req ,res) => {
    res.render('examples/new');
});

router.post('/', validateExample, catchAsync(async (req, res) => {
    //if(!req.body.example) throw new ExpressError('Invalid Example Data', 400);
    const example = new Example(req.body.example);
    await example.save();
    req.flash('success', 'Successfully made a new example.');
    res.redirect(`/examples/${example._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const example = await Example.findById(req.params.id).populate('revoews');
    if(!example){
        req.flash('error', 'Example not found')
        return res.redirect('/examples');
    }
    res.render('examples/show', { example });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const example = await Example.findById(req.params.id)
    if(!example){
        req.flash('error', 'Example not found')
        return res.redirect('/examples');
    }
    res.render('examples/edit', { example });
}))

router.put("/:id", isLoggedIn, validateExample, catchAsync(async (req,res) => {
    const { id } = req.params;
    const example = await Example.findByIdAndUpdate(id,{...req.body.example});
    req.flash('success', 'Successfully updated an example.');
    res.redirect(`/examples/${example._id}`)
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Example.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted example.');
    res.redirect('/examples');
}))

module.exports = router;