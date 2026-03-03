const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        name: Joi.string().max(100).required(),
        category: Joi.string().max(50).required(),
        description: Joi.string().max(2000).required(), // Increased to 2000 to allow for detailed AI descriptions
        websiteUrl: Joi.string().required(), 
        logo: Joi.string().allow("", null),
        
        // --- NEW FIELDS ALLOWED HERE ---
        pricingModel: Joi.string().valid("Free", "Freemium", "Paid", "Subscription").required(),
        tags: Joi.string().allow("", null),     // Accepts the comma-separated string
        features: Joi.string().allow("", null)  // Accepts the comma-separated string
    }).required(), 
});

// Review schema remains unchanged
module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),   
        comment : Joi.string().required()
    }).required()
});