const Joi = require('joi');

module.exports.exampleSchema = Joi.object({
    example: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        danger_level: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
});


