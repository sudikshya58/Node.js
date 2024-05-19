import express from "express";
const router=express.Router();
import auth from "../Middlewares/authentication.js";
import {login,register,getAllUser,updateUser,deleteUser,getUserDetails} from "../Controller/UserController.js";
//routes
router.post("/login",login);
router.post("/register",register);
router.get("/",getAllUser);
router.put("/update",auth,updateUser);
router.delete("/profile/delete",auth,deleteUser);
router.get("/profile",auth,getUserDetails);

export default router;