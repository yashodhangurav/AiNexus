const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage }); //multer will store files in cloudinary storage



// home route
router.get("/", validateListing,wrapAsync(listingController.home));

// index route
router.get("/listings", validateListing,wrapAsync(listingController.index));

// guide route
router.get("/guide", listingController.guide);


// New route
router.get("/listings/new", isLoggedIn, listingController.new )

//   chatbot route-------------------------------------------------------------------------------chatbot
router.get("/chatbot", listingController.chatbot );

// NEW route to handle the actual AI conversation API calls
router.post("/chatbot/ask", listingController.generateChatResponse);



// compare route
router.get("/listings/compare", listingController.compare);

// show route
router
.get("/listings/:id", validateListing, wrapAsync(listingController.show))

// In your routes/listings.js file:

// BAD (Causes "Unexpected field"): 
// router.post('/', upload.single('logo'), ... )

// GOOD (Fixes the error):
router.post('/listings', isLoggedIn, upload.single('listing[logo]'), validateListing, wrapAsync(listingController.createListing));

// create route
// router.post("/listings", 
//     isLoggedIn, 
//     upload.single('listing[imageUrl]'),
//     validateListing, //joivalidation
//     wrapAsync(listingController.createListing));




// edit route
router.get("/listings/:id/edit", 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.edit));


// update route
router.put("/listings/:id", 
    isLoggedIn,
    isOwner, 
    upload.single('listing[imageUrl]'),
    validateListing,
    wrapAsync (listingController.update));

// Delete route

router.delete("/listings/:id", 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.delete));
    



   

module.exports = router;