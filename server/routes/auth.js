import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
const router = express.Router();
import User from "../models/User.js";
//Configuration Multer file from Upload
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/uploads/"); //store uploaded file to the uploaded folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //use the original file name
  },
});

const upload = multer({ storage });

//User Registration

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.file;
    if (!profileImage) {
      return res.status(400).json({ success: false, msg: "No File Uploaded" });
    }
    //Path to the uploaded profile photo
    const profileImagePath = profileImage.path;
    if (!firstName) {
      return res
        .status(400)
        .json({ success: false, msg: "First Name is Require" });
    }
    if (!lastName) {
      return res
        .status(400)
        .json({ success: false, msg: "Last Name is Require" });
    }
    if (!email) {
      return res.status(400).json({ success: false, msg: "Email is Require" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, msg: "Password is Require" });
    }
    //check if user Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists!" });
    }
    //hashed the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      //   profileImage:profileImagePath
      profileImagePath,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, msg: "User Register Succefully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "User Register fail", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, msg: "Email is Require" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, msg: "Password is Require" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User doesn't exists!" });
    }

    //Compare the Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Password dosn't match" });
    }
    //Generate Web Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    return res
      .status(200)
      .json({ success: true, msg: "Password dosn't match", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "User Login fail", error });
  }
});

export default router;
