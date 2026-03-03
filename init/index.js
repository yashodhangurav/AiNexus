// Tell dotenv to go up one folder to find the .env file
require('dotenv').config({ path: '../.env' }); 


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); // Ensure this path is correct

// 2. Use the database URL from your .env file
// Make sure "ATLASDB_URL" matches the exact variable name in your .env file!
const dbUrl = process.env.ATLASDB_URL; 

main()
  .then(() => {
      console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
      console.log("Error connecting to database:", err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// Inserting sample data into the Atlas DB
const initDB = async () => {
  // Clear out any existing data
  await Listing.deleteMany({});
  
  // Add the 'submittedBy' user ID to every listing
  initData.data = initData.data.map((obj) => { 
      return { ...obj, submittedBy: "69a680227996209d67d90733" }; 
  }); 
  
  // Insert the new data
  await Listing.insertMany(initData.data);
  console.log("Data was successfully initialized in Atlas!");
};

initDB();