import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = ()=>{
    mongoose.connect(process.env.DB_URI as string).then(()=>{
    console.log("Connected to MongoDB");
})
};
