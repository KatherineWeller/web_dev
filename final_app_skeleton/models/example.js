const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
    title: String,
    image: String,
    danger_level: String,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

ExampleSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Example', exampleSchema);