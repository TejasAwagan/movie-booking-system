const mongoose = require("mongoose") ;
const Bookings = require("../models/Bookings") ;
const Movie = require("../models/Movie") ;
const {User} = require("../models/User") ;
const nodemailer = require("nodemailer") ;
const dotenv = require("dotenv") ;


dotenv.config({ path: "./.env" });

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_ID}`, // Your email
    pass: `${process.env.EMAIL_PASSWORD}`, // Your password
  },
});

const newBooking = async (req, res, next) => {
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
      mailOptions : "mca22.awagan.tejas.umakant@sunstone.edu.in", // Your email
      to: existingUser.email, // User's email
      subject: "Booking Confirmation",
      html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .ticket {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 400px;
                margin: 0 auto;
                text-align: center;
            }
            .movie-title {
                font-size: 24px;
                margin-bottom: 10px;
            }
            .seat-number {
                font-size: 18px;
                margin-bottom: 20px;
            }
            .button {
                background-color: #007bff;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
            .qr-code {
                margin-top: 20px;
            }

            .logo{
              width:110px;
              height:110px;
          }
        </style>
    </head>
    <body>
        <div class="ticket">
        <div class="qr-code">
    </div>
            <h3 class="movie-title">Hi,</h3>
            <h3>You have successfully booked tickets for <b>${existingMovie.title}</b> on <b>${date}</b></h3>
            <h3><b>Your seat number : ${seatNumber}</b></h3>
            <h3>Enjoy the movie!</h3>
            <a href="https://example.com" class="button">View Booking Details</a>
        </div>
    </body>
    </html>
    `,
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

const getBookingById = async (req, res, next) => {
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

const deleteBooking = async (req, res, next) => {
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

const getAllBooking = async(req,res,next) =>{
  let booking;
  try {
    booking = await Bookings.find();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
}

module.exports = {newBooking,getBookingById,deleteBooking,getAllBooking}
