const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");



const listingSchema = new Schema(
  {
    
    name: {
      type: String,
      required: [true, "Tool name is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },

    category: {
      type: String,
      enum: [
        "Text Generation",
        "Image Generation",
        "Video Editing",
        "Code Assistant",
        "Productivity",
        "Chatbot",
        "Voice AI",
        "Other",
      ],
    },

    pricingModel: {
      type: String,
      enum: ["Free", "Freemium", "Paid", "Subscription"],
      default: "Free",
    },

    websiteUrl: {
      type: String,
      required: [true, "Official website URL is required"],
    },

    // GOOD SYNTAX
    logo: {
      url: {
          type: String,
          default: "https://placehold.co/200x200?text=AI+Tool"
      },
      filename: {
          type: String
      }
    },

    screenshots: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    
    embedding: {
      type: [Number], // An array of numbers
    },
    launchDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// middleware to delete all reviews related to the deleted listing (mongoose middleware), (ehenever the findByIdAndDelete called for any listing this middleware also execute as a middlwaare)
listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in : listing.reviews}}); //if id is equal to the perticular deleted listing then all the Reviews related tp that listing will delete automatically
  }
  
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
