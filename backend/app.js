import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const app = express();

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.05ovdxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>app.listen(5000, console.log("Connected to Databse and server running")))
.catch((error)=>console.log("Error:",error))
