const Example = require('../models/example');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const examples = await Example.find({});
    res.render('examples/index', { examples })
}

// show page for making a new example
module.exports.renderNewForm = (req, res) => {
    res.render('examples/new');
}

// push new example to database
module.exports.createExample = async (req, res) => {
    const example = new Example(req.body.example);
    example.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    example.author = req.user._id;
    await example.save();
    console.log(example);
    req.flash('success', 'Successfully made a new example.');
    res.redirect(`/examples/${example._id}`)
}

// populate page for specific example
module.exports.showExample = async (req, res) => {
    // populate all the reviews and the author of the reviews, as well as the author of the campground
    const example = await Example.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!example){
        req.flash('error', 'Example not found')
        return res.redirect('/examples');
    }
    res.render('examples/show', { example });
}

// show edit example page
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const example = await Example.findById(id)
    if(!example) {
        req.flash('error', 'Example not found')
        return res.redirect('/examples');
    }
    res.render('examples/edit', { example });
}

// push edits to example to database
module.exports.updateExample = async (req,res) => {
    const { id } = req.params;
    console.log(req.body);
    const example = await Example.findByIdAndUpdate( id, { ...req.body.example });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    example.images.push(...imgs);
    await example.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await example.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages} } } })
    }
    req.flash('success', 'Successfully updated an example.');
    res.redirect(`/examples/${example._id}`)
}


// delete example from database
module.exports.deleteExample = async (req, res) => {
    const { id } = req.params;
    await Example.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted example.');
    res.redirect('/examples');
}