import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {admin && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              fontSize="1.5rem"
              fontWeight="800"
            >
              ADMIN
            </Typography>
            
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: "9rem"}}
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              bgcolor="rgb(148 163 184)"
              fontSize="1.5rem"
              fontWeight="600"
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
              fontWeight="800"
            >
              Added Movies
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "rgb(51 65 85)",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      borderRadius: 18
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left", fontSize: "5rem", }}
                    >
                      Movie: {movie.title}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;
