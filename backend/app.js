import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingRouter from "./routes/booking-routes";


dotenv.config();


const app = express();

//middlewares
app.use(express.json())
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter)


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.05ovdxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>app.listen(5000, console.log("Connected to Database and server running on port 5000")))
.catch((error)=>console.log("Error:",error))
