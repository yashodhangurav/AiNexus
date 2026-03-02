const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        name: Joi.string().max(100).required(),
        category: Joi.string().max(50).required(),
        description:Joi.string().max(1000).required(),
        logo: Joi.string().allow("", null),
        websiteUrl: Joi.string().required(), 
    }).required(), 
});

// review schema

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),   //rating should be a number and minimum value is 1 and maximum value is 5
        comment : Joi.string().required()
    }).required()
})