const express = require("express");

const {
  deleteUser,
  getAllUsers,
  getBookingsOfUser,
  getUserById,
  login,
  singup,
  updateUser,
  userExist
} = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", singup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);
// userRouter.post("/:email/:personName/:password", userExist);

module.exports = userRouter;
