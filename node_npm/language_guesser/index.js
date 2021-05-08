const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

const userInput = process.argv[2];

try {
    const langCode = franc(userInput);
    const language = langs.where("3", langCode);
    console.log(language.name.green);
} catch (err) {
    console.log('Unable to identify language. Try a longer sample size.');
}
