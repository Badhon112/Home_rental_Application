import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db.js";
import authRouters from './routes/auth.js'
import ListingRoute from './routes/listing.js'


const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT;
const DB_Username = process.env.DB_Name;
const DB_Password = process.env.DB_PASS;

const databaseConnection = async () => {
  await connectDb(DB_Username, DB_Password);
};

app.use("/auth",authRouters)
app.use("/properties",ListingRoute)

app.listen(PORT, () => {
    console.log("connection Succefull");
});
databaseConnection();
