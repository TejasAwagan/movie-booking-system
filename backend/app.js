import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/routes/user-routes";
import adminRouter from "./src/routes/admin-routes";
import movieRouter from "./src/routes/movie-routes";
import bookingsRouter from "./src/routes/booking-routes";
import cors from "cors";

dotenv.config({path: './.env'});
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.05ovdxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>app.listen(5000, console.log("Connected to Database and server running on port 5000")))
.catch((error)=>console.log("Error:",error))



