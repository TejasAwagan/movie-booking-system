import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store/index";
import logo from "../img/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
        <Toolbar>
          <IconButton
            onClick={toggleSidebar}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box width={{ xs: "50%", md: "30%" }}>
            {!showSidebar && (
              <IconButton LinkComponent={Link} to="/">
                <img src={logo} alt="logo" width="180px" />
              </IconButton>
            )}
          </Box>
          <Box width={{ xs: "50%", md: "40%" }} margin="auto">
            <Autocomplete
              onChange={handleChange}
              freeSolo
              options={movies && movies.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  sx={{ input: { color: "white" } }}
                  variant="standard"
                  {...params}
                  placeholder="Search Across Multiple Movies"
                />
              )}
            />
          </Box>
          <Box width={{ xs: "50%", md: "30%" }} display="flex" justifyContent="flex-end">
            {!showSidebar && (
              <Tabs
                textColor="inherit"
                indicatorColor="secondary"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/movies" label="Movies" />
                {!isAdminLoggedIn && !isUserLoggedIn && (
                  <>
                    <Tab label="Admin Login" LinkComponent={Link} to="/admin" />
                    <Tab label="User Login" LinkComponent={Link} to="/auth" />
                  </>
                )}
                {isUserLoggedIn && (
                  <>
                    <Tab label="Profile" LinkComponent={Link} to="/user" />
                    <Tab label="Reset Password" LinkComponent={Link} to="/reset-password" />
                    <Tab
                      onClick={() => logout(false)}
                      label="Logout"
                      LinkComponent={Link}
                      to="/"
                    />
                  </>
                )}
                {isAdminLoggedIn && (
                  <>
                    <Tab label="Add Movie" LinkComponent={Link} to="/add" />
                    <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                    <Tab label="Bookings" LinkComponent={Link} to="/user-bookings" />
                    <Tab
                      onClick={() => logout(true)}
                      label="Logout"
                      LinkComponent={Link}
                      to="/"
                    />
                  </>
                )}
              </Tabs>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showSidebar}
        onClose={toggleSidebar}
        variant="temporary"
      >
        <div style={{ width: "250px" }}>
          {/* Sidebar content goes here */}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" LinkComponent={Link} to="/admin" />
                <Tab label="Auth" LinkComponent={Link} to="/auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" LinkComponent={Link} to="/user" />
                <Tab label="Reset Password" LinkComponent={Link} to="/reset-password" />
                <Tab
                  onClick={() => logout(false)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Movie" LinkComponent={Link} to="/add" />
                <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                <Tab label="Bookings" LinkComponent={Link} to="/user-bookings" />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
          </Tabs>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
