const express = require ("express");
const {
  deleteBooking,
  getBookingById,
  newBooking,
  getAllBooking
} = require ("../controllers/booking-controller");

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/:id", deleteBooking);
bookingsRouter.get("/", getAllBooking);

module.exports =  bookingsRouter;
