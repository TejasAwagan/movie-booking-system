import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers.js";
import SeatingArrangement from "../SeatArrangement/SeatingArrangement.js";
import { useNavigate } from "react-router-dom";

const Booking = ({ onSeatSelect }) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ date: "" });
  const [selectedSeat, setSelectedSeat] = useState("");
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id, seatNumber: selectedSeat })
      .then((res) => console.log(res))
      .then(() => navigate("/user"))
      .catch((err) => console.log(err));
  };

  const handleSeatSelect = (seatId) => {
    setSelectedSeat(seatId);
    onSeatSelect(seatId);
  };

  const isFutureDate = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    return selectedDate >= today;
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie : {movie.title}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            bgcolor={"rgb(51 65 85)"}
          >
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              paddingLeft={3}
              width="70%"
              marginRight={"auto"}
              borderRadius={"18px"}
            >
              <img
                width="70%"
                height={"340px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2} fontWeight={"bold"}>
                  Description : {movie.description}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Star Cast :{" "}
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={2}>
              <form onSubmit={handleSubmit}>
                <Box
                  paddingTop={0}
                  paddingRight={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <SeatingArrangement onSeatSelect={handleSeatSelect} />

                  <FormLabel sx={{ color: "#fff" }}>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                    sx={{
                      bgcolor: "#fff",
                      width: "100%",
                      borderRadius: "18px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                      // Prevent selecting past dates
                    }}
                  />
                  <Button
                    type="submit"
                    sx={{
                      mt: 3,
                      bgcolor: "rgb(8 47 73)",
                      height: "50px",
                      width: "100%",
                      borderRadius: "18px",
                      color: "#fff",
                      ":hover": { bgcolor: "rgb(3 105 161)" },
                    }}
                    disabled={!isFutureDate(inputs.date)}
                  >
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
