const express = require("express") ;
const {
  addMovie,
  getAllMovies,
  getMovieById,
  deleteMovie
} = require("../controllers/movie-controller") ;
const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
movieRouter.delete("/:id", deleteMovie);

module.exports = movieRouter;
