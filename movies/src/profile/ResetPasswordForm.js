import React, { useState } from "react";
import { Box, Button, TextField, Typography, FormLabel } from "@mui/material";
import { updateUserPassword } from "../api-helpers/api-helpers";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const labelProps = {
  mt: 1,
  mb: 1,
};

const ResetPasswordForm  = () => {
  const id = useParams().id
  let userId = localStorage.getItem("userId");
  // console.log(userId);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "", // Add a state for confirming the new password
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = inputs;
        
    if (password !== confirmPassword) {
      // Passwords don't match
      toast.error("Passwords do not match.");
      return;
    }
    if (password === "" || confirmPassword === "") {
      // Passwords don't match
      toast.error("Fill all the Fields");
      return;
    }

    
    try {
      await updateUserPassword({ id, userId, password });
      toast.success("Password Update Successfully !", {
        autoClose: 3000, // Set the display time to 3000 milliseconds (3 seconds)
      })
      navigate(`/user`);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password. Please try again.");
    }

  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Box
          width={"40%"}
          padding={10}
          margin="auto"
          marginTop={5}
          marginBottom={5}
          display={"flex"}
          flexDirection="column"
          boxShadow={"-1px 4px 31px -1px #fff"}
          sx={{ bgcolor: "rgb(82 82 91)", borderRadius: "20px" }}
        >
          <Typography
            textAlign={"center"}
            fontFamily={"verdana"}
            fontSize={"3.5rem"}
            fontWeight={800}
            mb={3}
          >
            Reset Password
          </Typography>

          <FormLabel sx={{ labelProps, color: "#fff" }}>
            Enter New Password
          </FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            name="password"
            type="password"
            variant="standard"
            margin="normal"
            style={{ color: "#fff" }}
            sx={{
              color: "#fff",
              borderRadius: "10px",
              bgcolor: "white",
              textUnderlineOffset: "#fff",
              paddingLeft: "8px",
            }}
          />

          <FormLabel sx={{ labelProps, color: "#fff" }}>
            Confirm New Password
          </FormLabel>
          <TextField
            value={inputs.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            variant="standard"
            margin="normal"
            style={{ color: "#fff" }}
            sx={{
              color: "#fff",
              borderRadius: "10px",
              bgcolor: "white",
              textUnderlineOffset: "#fff",
              paddingLeft: "8px",
            }}
          />
          <Button
          type="submit"
          variant="contained"
          sx={{
            mt:"50px",
            ml:"auto",
            mr:"auto",
            width: "40%",
            color: "#fff",
            fontSize:"15px",
            borderRadius:"18px",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
        >
          Update Password
        </Button>
        </Box>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
