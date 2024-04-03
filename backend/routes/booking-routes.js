import express from "express";
import { newBooking, getBookingById, deleteBooking } from "../controllers/booking-controller";

const bookingRouter = express.Router();

bookingRouter.post("/",newBooking)
bookingRouter.get("/:id",getBookingById)
bookingRouter.delete("/:id",deleteBooking)

export default bookingRouter;