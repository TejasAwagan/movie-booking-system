const jwt = require("jsonwebtoken") ;
const mongoose = require ("mongoose");
const {Admin, secretKey} = require ("../models/Admin.js");
// const {secretKey} = require("../models/Admin.js")
const Movie = require ("../models/Movie");
// const secretKey = `${process.env.SECRET_KEY}`;

const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }
  let adminId ;

  try {
    // Verify token asynchronously
    // const decrypted = await jwt.verify(extractedToken, `${process.env.SECRET_KEY}`);
    // adminId = decrypted.id;
    adminId = req.body.admin;
  } catch (err) {
    return res.status(400).json({ message: `${err.message}` });
  }


  // const token = req.headers.authorization;

  // if (!token) {
  //   return res.status(401).json({ message: "No token provided" });
  // }

  // try {
  //   // Verify JWT token
  //   const decoded = jwt.verify(token, secretKey);

  //   // Extract adminId from decoded token
  //   req.adminId = decoded.adminId;

  //   next();
  // } catch (error) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  //create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
};

 const getAllMovies = async (req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};

 const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};

 const deleteMovie = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findByIdAndDelete(id).populate("bookings admin")
    console.log(movie);
    const session = await mongoose.startSession();
    session.startTransaction();
    await movie.admin.addedMovies.pull(movie);
    await movie.bookings.movie.pull(movie);
    await movie.admin.save({ session });
    await movie.bookings.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};  

module.exports = {addMovie, deleteMovie, getMovieById,getAllMovies }