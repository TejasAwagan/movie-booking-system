import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const labelProps = {
  mt: 1,
  mb: 1,
};
const AddMovie = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  // const navigate = Navigate();
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      navigate("/movies")
  };
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Box
          width={"40%"}
          padding={10}
          margin="auto"
          marginTop={5}
          marginBottom={5}
          display={"flex"}
          flexDirection="column"
          // boxShadow= {"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}
          boxShadow={"-1px 4px 31px -1px #fff"} 
          
          sx={{bgcolor:"rgb(82 82 91)", borderRadius:"20px"}}
        >
          <Typography textAlign={"center"}  fontFamily={"verdana"} fontSize={"3.5rem"} fontWeight={800}>
            Add New Movie
          </Typography>

          <FormLabel sx={{labelProps, color:"#fff"}}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
            style={{color:"#fff"}}
            sx={{color:"#fff", borderRadius:"10px", bgcolor:"white", textUnderlineOffset:"#fff", paddingLeft:"8px"}}
          />
          <FormLabel sx={{labelProps, color:"#fff"}}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
            style={{color:"white"}}
            sx={{color:"#fff", borderRadius:"10px", bgcolor:"white", textUnderlineOffset:"#fff", paddingLeft:"8px"}}
          />
          <FormLabel sx={{labelProps, color:"#fff"}}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
            sx={{color:"#fff", borderRadius:"10px", bgcolor:"white", textUnderlineOffset:"#fff", paddingLeft:"8px"}}

          />
          <FormLabel sx={{labelProps, color:"#fff"}}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
            sx={{color:"#fff", borderRadius:"10px", bgcolor:"white", paddingRight:"10px", paddingLeft:"8px"}}
          />
          <FormLabel sx={{labelProps, color:"#fff"}}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
              sx={{color:"#fff", bgcolor:"#fff", borderRadius:"10px", border:"none",paddingLeft:"8px"}}
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={{labelProps, color:"#fff"}}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto", color:"#fff" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              color:"#fff",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
