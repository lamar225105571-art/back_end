import express from "express";
import { GetAllUsers, AddNew, DeleteUser, ChangeInfo, GetUser } from '../ROUTES/user.rout.js'
const UserRouter = express.Router();


UserRouter.get("/GetAllUsers", GetAllUsers)

UserRouter.get("/GetUser", GetUser)

UserRouter.post("/AddNew", AddNew)

UserRouter.delete("/DeleteUser", DeleteUser)

UserRouter.put("/ChangeInfo", ChangeInfo)


export default UserRouter