const Example = require('../models/example');

module.exports.index = async (req, res) => {
    const examples = await Example.find({});
    res.render('examples/index', { examples })
}

module.exports.renderNewForm = (req, res) => {
    res.render('examples/new');
}

module.exports.createExample = async (req, res) => {
    //if(!req.body.example) throw new ExpressError('Invalid Example Data', 400);
    const example = new Example(req.body.example);
    example.author = req.user._id;
    await example.save();
    req.flash('success', 'Successfully made a new example.');
    res.redirect(`/examples/${example._id}`)
}

module.exports.showExample = async (req, res) => {
    // populate all the reviews and the author of the reviews, as well as the author of the campground
    const example = await (await Example.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path: 'author'
        }
    })).populate('author');
    if(!example){
        req.flash('error', 'Example not found')
        return res.redirect('/examples');
    }
    res.render('examples/show', { example });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const example = await Example.findById(id)
    if(!example){
        req.flash('error', 'Example not found')
        return res.redirect('/examples');
    }
    res.render('examples/edit', { example });
}

module.exports.updateExample = async (req,res) => {
    const { id } = req.params;
    const example = await Example.findById(id);
    const ex = await Example.findByIdAndUpdate(id,{...req.body.example});
    req.flash('success', 'Successfully updated an example.');
    res.redirect(`/examples/${example._id}`)
}

module.exports.deleteExample = async (req, res) => {
    const { id } = req.params;
    await Example.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted example.');
    res.redirect('/examples');
}