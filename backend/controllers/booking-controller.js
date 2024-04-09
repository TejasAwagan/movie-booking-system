import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({path: './.env'});

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    
    user: `${process.env.EMAIL_ID}`, // Your email
    pass: `${process.env.EMAIL_PASSWORD}`, // Your password
  },
});

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
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
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

    // Send an email after booking tickets
    const mailOptions = {
      from: "mca22.awagan.tejas.umakant@sunstone.edu.in", // Your email
      to: existingUser.email, // User's email
      subject: "Booking Confirmation",
      html: `<h3>Hi,</h3>
         <h3>You have successfully booked tickets for <b>${existingMovie.title}<b> on <b>${date}<b></h3>
         <h3><b>Your seat number(s): ${seatNumber}<b></h3>
         <h3>Enjoy the movie!</h3>`
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
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
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
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
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
