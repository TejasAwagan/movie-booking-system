import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers.js";
import CradLayout from "../HomePage/CradLayout.js";

const AllMovies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant="h4" padding={2} textAlign="center" borderRadius={6}>
        All Movies
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {movies &&
          movies.map((movie, index) => (
            <CradLayout
              id={movie._id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              posterUrl={movie.posterUrl}
              description={movie.description}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default AllMovies;
