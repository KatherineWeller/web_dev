//const session = require('express-session');
//const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret: 'squirrel'
//     }
// });

mongoose.connect('mongodb://localhost:27017/recipeApp', {useNewUrlParser: true, useUnifiedTopology: true} )
    .then( () => {
        console.log("CONNECTION OPEN")
    })
    .catch(err => {
      console.log("ERROR")  
    })

const recipeSchema = new mongoose.Schema({
    recipe_name: String,
    ingredients: String,
    cook_time: Number,
    servings: Number

});

const Recipe = mongoose.model('Recipe', recipeSchema);

const paprikaChicken = new Recipe({recipe_name: 'Paprika Chicken', ingredients: 'paprika, chicken', cook_time: 40, servings: 2});

