const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

// giving images their own schema
const ImageSchema = new Schema({
    url: String,
    filename: String
});

// Return a thumnail version of the image so they are all uniform
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

// example schema to define set properties
const exampleSchema = new Schema({
    title: String,
    images: [ImageSchema],
    danger_level: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// tool to delete example from database
ExampleSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Example', exampleSchema);