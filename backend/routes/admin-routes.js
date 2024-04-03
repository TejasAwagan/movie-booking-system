import express from "express";
import { addAdmin, adminLogin, getAdmin, getAdminById } from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post('/signup', addAdmin)
adminRouter.post('/signin', adminLogin)
adminRouter.get('/', getAdmin)
adminRouter.get('/:id', getAdminById)

export default adminRouter;