const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter =require( "./src/routes/user-routes");
const adminRouter = require("./src/routes/admin-routes");
const movieRouter = require("./src/routes/movie-routes");
const bookingsRouter = require("./src/routes/booking-routes");
const cors = require("cors");
const { dataService } = require("./src/controllers/user-controller");
const PORT = process.env.PORT || 5000;

dotenv.config({path: './.env'});
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);
app.use("/dataService", dataService)


mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.05ovdxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>app.listen(PORT, console.log("Connected to Database and server running on port 5000")))
.catch((error)=>console.log("Error:",error))





