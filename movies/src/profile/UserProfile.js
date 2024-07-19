import {
  Box,
  Typography,
  IconButton,
  Grid,
  CardContent,
  CardActions,
  Card,
  // ListItem,
  // ListItemText,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        setBookings(bookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {user && (
        <Fragment>
          <Box textAlign="center" mt={3}>
            <AccountCircleIcon sx={{ fontSize: "10rem", color: "#2196f3" }} />
            <Typography variant="h4" mt={2} fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body1" mt={1}>
              Email: {user.email} 
            </Typography>
          </Box>

          <Box mt={3} width="100%">
            <Typography variant="h4" textAlign="center" mb={2} color="#fff">
              Bookings
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              marginTop={4}
            >
              <Grid container spacing={2}>
                {bookings.map((booking) => (
                  <Grid item key={booking._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        width: "100%",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          align="center"
                          color="text.primary"
                          gutterBottom
                        >
                          {booking.movie
                            ? booking.movie.title
                            : "Title not available"}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          align="center"
                          gutterBottom
                        >
                          Seat No: {booking.seatNumber}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          align="center"
                        >
                          Date: {new Date(booking.date).toDateString()}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "center" }}>
                        <IconButton
                          onClick={() => handleDelete(booking._id)}
                          color="error"
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default UserProfile;
