import User from "../models/User";
import bcrypt from "bcryptjs";
import Bookings from "../models/Bookings";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ users });
};

export const singup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    // return res.status(422).json({ message: "Invalid Inputs" });
    throw new ApiError(400, "Invalid Inputs");
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    // return res.status(500).json({ message: "Unexpected Error Occured" });
    throw new ApiError(500, "Unexpected Error Occured")
  }
  return res.status(201).json(
    new ApiResponse(201, {id: user._id}, "User Registered Successfully" )
  );
};
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    // return res.status(422).json({ message: "Invalid Inputs" });
    throw new ApiError(422, "Invalid Inputs")
  }
  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (errr) {
    return console.log(errr);
  }
  if (!user) {
    // return res.status(500).json({ message: "Something went wrong" });
    throw new ApiError(500, "Something went wrong");
  }
  res.status(200).json(
    new ApiResponse(200, "user Updated Sucessfully")
  );
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    // return res.status(500).json({ message: "Something went wrong" });
    throw new ApiError(500, "Something went wrong");
  }
  return res.status(200).json(
    new ApiResponse(200, "User Deleted Successfully")
  );
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    // return res.status(422).json({ message: "Invalid Inputs" });
    throw new ApiError(422, "Invalid Inputs")
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    // return res
    //   .status(404)
    //   .json({ message: "Unable to find user from this ID" });
    throw new ApiError(404, "Unable to find user from this ID")
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    // return res.status(400).json({ message: "Incorrect Password" });
    throw new ApiError(400, "Incorrect Password");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {id: existingUser._id}, "Login Successfull"));
};

export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.find({ user: id })
      .populate("movie")
      .populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    // return res.status(500).json({ message: "Unable to get Bookings" });
    throw new ApiError(500, "Unable to get Bookings")
  }
  return res.status(200).json(
    new ApiResponse(200, bookings, "booking Fetched")
  );
};
export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    // return res.status(500).json({ message: "Unexpected Error Occured" });
    throw new ApiError(500, "Unexpected Error Occured")
  }
  return res.status(200).json(
    new ApiResponse(200, user, "User Fetched Successfully")
  );
};
