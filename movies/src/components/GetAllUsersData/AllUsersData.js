import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  // getBookingById
  // getAllBooking,
  // getUserBooking,
  // getUserDetails,
  // deleteBooking,
} from "../../api-helpers/api-helpers.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ErrorBoundary from "../ErrorBoundary.js";

// const ErrorFallback = ({ error }) => (
//   <Typography variant="body1" color="error">
//     {error.message}
//   </Typography>
// );

const AllUsersData = () => {
  // const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState([]);
  

  useEffect(() => {
    // getBookingById()
    //   .then((res) => setBookings(res.bookings))
    //   .catch((err) => console.log(err));

    // getUserDetails()
    //   .then((res) => setUser(res.user))
    //   .catch((err) => console.log(err));
    getAllUsers()
      .then((res) => setUser(res.users))
      .catch((err) => console.log(err));
  }, []);

  // const handleDelete = (id) => {
  //   deleteBooking(id)
  //     .then((res) => {
  //       setBookings(bookings.filter((booking) => booking._id !== id));
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px", }}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "rgb(51 65 85)" }}>
            <TableCell
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Name
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Email
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Bookings Id
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <TableRow key={user._id} style={{ cursor: "pointer" }}>
              <TableCell
                style={{
                  textAlign: "center",
                  fontSize: "21px",
                  color: "#666",
                }}
              >
                {user.name}
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  fontSize: "21px",
                  color: "#666",
                }}
              >
                {user.email}
              </TableCell>
              <TableCell style={{ textAlign: "center", fontSize: "21px" }}>
                <ul style={{ padding: 0, margin: 0 }}>
                  {user.bookings.map((booking) => (
                    <li
                      key={booking}
                      style={{
                        listStyle: "none",
                        margin: "5px 0",
                        fontWeight: "bold",
                        color: "#007bff",
                      }}
                    >
                      {booking}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default AllUsersData;
