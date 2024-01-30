import express from "express";
import multer from "multer";
import Listing from "../models/Listing.js";
import User from "../models/User.js";
const router = express.Router();

//Configuration Multer for file Uploadeds
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); //Store uploaded file to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //use the original file name
  },
});

const upload = multer({ storage });

//Create Listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bethroomCount,
      amenities,
      title,
      description,
      highlight,
      highligthDesc,
      price,
    } = req.body;
    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No File Uploaded");
    }
    const listingPhotoPaths = listingPhotos.map((file) => file.path);
    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bethroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highligthDesc,
      price,
    });
    await newListing.save();
    res.status(200).json(newListing);
  } catch (error) {
    res.status(409).json({
      message: "Fail to create listing",
      success: false,
      error,
    });
  }
});

//Get Listing
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }
    res.status(200).json(listings);
  } catch (error) {
    res.status(404).json({
      message: "Fail to create listing",
      success: false,
      error,
    });
  }
});
//listing Details

router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    // console.log(listingId);
    const listing = await Listing.findById(listingId);
    res.status(202).json(listing);
  } catch (error) {
    res.status(404).json({ message: "Listing can't found", error });
  }
});

export default router;
