import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const { addToast } = useToasts();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // onSubmit({ inputs, signup: isAdmin ? false : isSignup }).catch(()=>{
    //   setErrorMessage("Login failed. Please try again.");
    // })

    // Validation checks
    if (!inputs.email || !inputs.password || inputs.email === "" || inputs.password === "" ) {
      addToast("Please fill in all fields.", { appearance: "error",autoDismiss: true,placement: "top-center" });
      return;
    }

    try {
      await onSubmit({ inputs, signup: isAdmin ? false : isSignup });
      // Show success toast if login is successful
      addToast("Login successful!", { appearance: "success", autoDismiss: true  });
    } catch (error) {
      // Show error toast if login fails
      addToast("Login failed. Please try again.", { appearance: "error", autoDismiss: true  });
    }
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
      
    </Dialog>
  );
};

export default AuthForm;
