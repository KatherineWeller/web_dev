const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
    title: String,
    image: String,
    danger_level: String,
    description: String,
    location: String
})

module.exports = mongoose.model('Example', exampleSchema);