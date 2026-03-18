const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordLocalMongoose = require("passport-local-mongoose"); 


// You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

const userSchema = new Schema({
   
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
  
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
  
    profileImage: {
      type: String,
      default: "https://placehold.co/200x200/4CAF50/FFFFFF?text=User",
    },

    savedListings: [
      {
          type: Schema.Types.ObjectId,
          ref: "Listing",
      }
  ],
  
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  });


  
  userSchema.plugin(passwordLocalMongoose); //this will add username and password fields to the schema and also add some methods(setpassword,changepass etc..), hashing,salting to the schema
  module.exports = mongoose.model("User",userSchema);