const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const biomes = require('./biomes');
const { civilizations, descriptors } = require('./seedHelpers');
const Example = require('../models/example');

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Example.deleteMany({});
    for(let i = 0; i < 50; i++){
        const rand = Math.floor(Math.random() * 3);
        const biome = new Example({
            danger_level: `${biomes[rand].danger_level}`,
            title: `${sample(descriptors)} ${sample(civilizations)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'This is an example description.',
        })
        await biome.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})