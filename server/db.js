import mongoose from "mongoose";

const connectDb=async(username,password)=>{
try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.weatdsw.mongodb.net/?retryWrites=true&w=majority`)
    console.log("Databse Connetion Succefull");
} catch (error) {
    console.log(error);
}
}
export default connectDb;