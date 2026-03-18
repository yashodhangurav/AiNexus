const Listing = require("../models/listing.js")
const {listingSchema} = require("../schema.js");

const { GoogleGenerativeAI } = require("@google/generative-ai");
// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);




module.exports.home = async(req,res)=>{
    res.render("listings/home.ejs")
}

module.exports.index = async(req,res)=>{
    // Add .populate("reviews") right here! 👇
    const allListings = await Listing.find({}).populate("reviews");
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

// -------------------------------------------------------------------------CREATE LISTING---------------------------------------------------
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

        // 5. Cloudinary Upload Logic 
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            newListing.logo = { url, filename }; 
        }

        // =======================================================================
        // 6. 🌟 THE NEW AI MAGIC: GENERATE VECTOR EMBEDDING
        // =======================================================================
        // Combine the text so Gemini can understand everything about this tool
        const featuresText = newListing.features ? newListing.features.join(', ') : '';
        const textToEmbed = `${newListing.name}. Category: ${newListing.category}. Description: ${newListing.description}. Features: ${featuresText}`;
        
        // Ask Gemini to turn that text into a 768-dimension math array
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        const result = await model.embedContent(textToEmbed);
        
        // Save the math array into your new database field!
        newListing.embedding = result.embedding.values;
        // =======================================================================

        // 7. Save to database
        await newListing.save();

        req.flash("success", "New AI Tool added with Smart Search Data!");
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


//--------------------------------------------- Add this to controllers/listings.js -----------------------------------------
module.exports.compare = async (req, res) => {
    // Get the tool IDs from the URL (e.g., /compare?tool1=123&tool2=456)
    const { tool1, tool2 } = req.query;
    
    // Fetch all listings to populate the dropdown menus (alphabetical order)
    const allListings = await Listing.find({}).sort({ name: 1 });
    
    let item1 = null;
    let item2 = null;

    // If IDs are provided in the URL, fetch their full data + reviews
    if (tool1) {
        item1 = await Listing.findById(tool1).populate('reviews');
    }
    if (tool2) {
        item2 = await Listing.findById(tool2).populate('reviews');
    }

    // Send everything to the new EJS page
    res.render("listings/compare.ejs", { allListings, item1, item2, tool1, tool2 });
};



// Handles the API request from the chatbot UI
module.exports.generateChatResponse = async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        // Use the fast, free Flash model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // This "Prompt Engineering" forces the AI to act like your specific app's assistant
        const systemPrompt = `
        You are the "AiNexus Matchmaker", the official AI assistant for the AiNexus Tool Directory. 
        Your job is to recommend AI tools based on the user's request.
        Keep your responses friendly, concise, and beautifully formatted with bullet points.
        Do not output giant walls of text. Provide 2-3 highly relevant AI tool recommendations.
        
        User Request: ${userMessage}
        `;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();

        // Send the AI's text back to the frontend
        res.json({ reply: responseText });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Sorry, my neural network is currently resting. Please try again later!" });
    }
};



// --- ---------------------------------AUTO-MAGIC TOOL SUBMISSION ---
module.exports.autoFill = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL is required" });

        // 1. Fetch the website's HTML
        const response = await fetch(url);
        const html = await response.text();
        
        // 2. Strip out scripts, styles, and HTML tags to save Gemini tokens
        const cleanText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                              .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                              .replace(/<[^>]+>/g, ' ')
                              .substring(0, 15000); // Limit to 15k chars to keep it fast

        // 3. Ask Gemini to extract the data and format it as JSON
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
        You are an AI data extractor for an AI Tool Directory. Analyze the following website text and extract the details of the AI tool.
        
        CRITICAL RULES:
        1. You MUST return ONLY a raw JSON object. Do not use markdown formatting, backticks, or conversational text.
        2. IF the website does NOT appear to be an actual AI tool (e.g., it is a domain parking page, an auction, or broken), return EXACTLY this JSON: {"error": "Not an AI tool"}
        3. IF it is a valid AI tool, use this EXACT structure:
        {
            "name": "Name of the tool",
            "description": "A concise, engaging 2-3 sentence description. Do not mention that you extracted this from a website.",
            "category": "Pick ONE best match from: Text Generation, Image Generation, Video Editing, Code Assistant, Productivity, Chatbot, Voice AI, Other",
            "features": "Feature 1, Feature 2, Feature 3"
        }

        Website Text:
        ${cleanText}
        `;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();
        
        // Clean up potential markdown blocks if Gemini accidentally includes them
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const toolData = JSON.parse(responseText);
        res.json(toolData);

    } catch (error) {
        console.error("Auto-Fill Error:", error);
        res.status(500).json({ error: "Could not analyze the website. Please fill manually." });
    }
};




   // 6. 🌟 THE NEW AI MAGIC: GENERATE VECTOR EMBEDDING

module.exports.smartSearch = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);

        // 1. Convert the user's search text into a math vector
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        const queryResult = await model.embedContent(query);
        const queryVector = queryResult.embedding.values;

        // 2. Perform the blazing-fast Vector Search directly in MongoDB!
        const results = await Listing.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index", // Use whatever name you gave the index in Step 3 (usually "default" or "vector_index")
                    path: "embedding",
                    queryVector: queryVector,
                    numCandidates: 100, // Looks at the 100 closest matches
                    limit: 10 // Only returns the top 10 best matches
                }
            },
            {
                // We only send back the necessary data to keep the internet payload tiny
                $project: {
                    name: 1, description: 1, category: 1, logo: 1, pricingModel: 1, 
                    score: { $meta: "vectorSearchScore" } // Shows us how confident the AI is!
                }
            }
        ]);

        res.json(results);

    } catch (error) {
        console.error("Vector Search Error:", error);
        res.status(500).json({ error: "Search failed" });
    }
};






























































// // --- ONE-TIME MIGRATION SCRIPT ---
// module.exports.generateMissingEmbeddings = async (req, res) => {
//     try {
//         // Find all tools that DO NOT have an embedding yet
//         const listingsWithoutEmbeddings = await Listing.find({ embedding: { $exists: false } });
        
//         if (listingsWithoutEmbeddings.length === 0) {
//             return res.send("All tools already have embeddings! You are good to go.");
//         }

//         const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
//         let updatedCount = 0;

//         // Loop through them one by one
//         for (let listing of listingsWithoutEmbeddings) {
//             const featuresText = listing.features ? listing.features.join(', ') : '';
//             const textToEmbed = `${listing.name}. Category: ${listing.category}. Description: ${listing.description}. Features: ${featuresText}`;
            
//             // Generate the math
//             const result = await model.embedContent(textToEmbed);
            
//             // Save it to the tool
//             listing.embedding = result.embedding.values;
//             await listing.save();
//             updatedCount++;
            
//             // Pause for 1 second so we don't hit Gemini API rate limits!
//             await new Promise(resolve => setTimeout(resolve, 1000)); 
//         }

//         res.send(`Successfully generated AI math for ${updatedCount} old tools! Your database is fully upgraded.`);

//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error updating old tools.");
//     }
// };