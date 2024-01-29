import mongoose, { Schema } from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    streetAddress: {
      type: String,
      require: true,
    },
    aptSuite: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    guestCount: {
      type: String,
      require: true,
    },
    bedroomCount: {
      type: String,
      require: true,
    },
    bedCount: {
      type: String,
      require: true,
    },
    bethroomCount: {
      type: String,
      require: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    listingPhotoPaths: [{}], //store photo url
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    highlight: {
      type: String,
      require: true,
    },
    highligthDesc: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;
