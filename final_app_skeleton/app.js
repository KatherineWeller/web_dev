const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { exampleSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');
const Example = require('./models/example');
const { runInNewContext } = require('vm');

mongoose.connect('mongodb://localhost:27017/exampledb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

const validateExample = (req, res, next) => {
    const { error } = exampleSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/examples', catchAsync(async (req, res) => {
    const examples = await Example.find({});
    res.render('examples/index', { examples })
}));

app.get('/examples/new', (req ,res) => {
    res.render('examples/new');
});

app.post('/examples', validateExample, catchAsync(async (req, res) => {
    //if(!req.body.example) throw new ExpressError('Invalid Example Data', 400);
    const example = new Example(req.body.example);
    await example.save();
    res.redirect(`/examples/${example._id}`)
}))

app.get('/examples/:id', catchAsync(async (req, res) => {
    const example = await Example.findById(req.params.id)
    res.render('examples/show', { example });
}));

app.get('/examples/:id/edit', catchAsync(async (req, res) => {
    const example = await Example.findById(req.params.id)
    res.render('examples/edit', { example });
}))

app.put("/examples/:id", validateExample, catchAsync(async (req,res) => {
    const { id } = req.params;
    const example = await Example.findByIdAndUpdate(id,{...req.body.example});
    res.redirect(`/examples/${example._id}`)
}))

app.delete('/examples/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Example.findByIdAndDelete(id);
    res.redirect('/examples');
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Oh No, Something Went Wrong!"
    res.status(statusCode).reder('error')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})