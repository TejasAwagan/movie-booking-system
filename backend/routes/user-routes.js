import express from "express";
import { getAllUser, signUp, updateUser, deleteUser, login, getBookingsOfUser, getUserById } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUser)
userRouter.post("/signup", signUp)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.post("/login", login)
userRouter.get("/bookings/:id", getBookingsOfUser)
userRouter.get("/:id", getUserById);

export default userRouter;