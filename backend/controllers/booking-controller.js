import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";
import {ApiError} from "../utils/ApiError";
import {ApiResponse} from "../utils/ApiResponse";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    // return res.status(404).json({ message: "Movie Not Found With Given ID" });
    throw new ApiError(404, "Movie Not Found With Given ID");
  }
  if (!user) {
    // return res.status(404).json({ message: "User not found with given ID " });
    throw new ApiError(404, "User not found with given ID")
  }
  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    // return res.status(500).json({ message: "Unable to create a booking" });
    throw new ApiError(500,"Unable to create a booking")
  }

  return res.status(201).json(
    new ApiResponse(201, booking, "New Booking Added Successfully")
  );
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    // return res.status(500).json({ message: "Unexpected Error" });
    throw new ApiError(500, "Unexpected Error");
  }
  return res.status(200).json(
    new ApiResponse(200, booking, "Booking fetched Successfully")
  );
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndDelete(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    // return res.status(500).json({ message: "Unable to Delete" });
    throw new Error(500, "Unable to Delete");
  }
  return res.status(200).json(
    new ApiResponse(200, booking, "Booking Delete Successfully")  
  );
};