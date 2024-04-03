import express from "express";
import { addAdmin, adminLogin } from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post('/signup', addAdmin)
adminRouter.post('/signin', adminLogin)

export default adminRouter;