const Listing = require("../models/listing.js")
const {listingSchema} = require("../schema.js");





module.exports.home = async(req,res)=>{
    res.render("listings/home.ejs")
}

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
};

module.exports.guide = (req,res)=>{
    res.render("listings/guide.ejs");
};


module.exports.new = (req,res)=>{ //isLoggedIn is middleware to check whether userLoggedin or not
    res.render("listings/new.ejs")
};

module.exports.show = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: {path : "author"}})
    .populate("submittedBy"); // <--- FIXED
    
    if(!listing){
        req.flash("error", "Listing you requiested for does not exist !"); //if listing does not exist which we want to acess it will throw error in the form of flash
        return res.redirect("/home/listings");
    }
    res.render("listings/show.ejs", {listing})
};

module.exports.createListing = async (req, res, next) => {
    try {
        const listingData = req.body.listing;

        // 1. Convert comma-separated strings into Arrays
        if (listingData.tags) {
            listingData.tags = listingData.tags
                .split(',')
                .map(tag => tag.trim().toLowerCase())
                .filter(tag => tag.length > 0);
        }
        
        if (listingData.features) {
            listingData.features = listingData.features
                .split(',')
                .map(feature => feature.trim())
                .filter(feature => feature.length > 0);
        }

        // 2. Auto-generate a URL-friendly slug
        if (listingData.name) {
            listingData.slug = listingData.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        // 3. Create the new Mongoose document
        const newListing = new Listing(listingData);

        // 4. Assign the logged-in user 
        newListing.submittedBy = req.user._id; 

        // 5. Cloudinary Upload Logic (Just like your old code!)
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            newListing.logo = { url, filename }; 
        }

        // 6. Save to database
        await newListing.save();

        req.flash("success", "New AI Tool is created!");
        res.redirect("/home/listings");

    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", err.message);
        res.redirect("/home/listings/new");
    }
};

module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); // Usually you don't even need to populate here!
    // ...
    if(!listing){
        req.flash("error", "Listing you requiested for does not exist !");
        return res.redirect("/home/listings");
    }
    res.render("listings/edit.ejs", {listing});
};


module.exports.update = async (req,res) => {
    let {id} = req.params;
     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
     if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.imageUrl = {url, filename};
        await listing.save();
     }
     

    req.flash("success", "Ai Tool Updated !"); //flash
    res.redirect(`/home/listings/${id}`);
};

module.exports.delete = async(req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Ai Tool Deleted !"); //flash
    res.redirect("/home/listings");
};


module.exports.chatbot = (req,res)=>{
    res.render("listings/chatbot.ejs")
};
