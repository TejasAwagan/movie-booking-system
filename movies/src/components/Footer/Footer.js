import React from "react";
import { Container, Grid, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../img/logo.png"

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2b2d42", padding: "20px 0" }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Connect with us:
            </Typography>
            <div>
              <Link href="#" style={{ marginRight: "10px" }}>
                <FacebookIcon />
              </Link>
              <Link href="#" style={{ marginRight: "10px" }}>
                <TwitterIcon />
              </Link>
              <Link href="#">
                <InstagramIcon />
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <img src={logo} alt="Brand Logo" style={{ width: "150px" }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} BookItNow. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
