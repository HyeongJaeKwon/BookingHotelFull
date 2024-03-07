import express from "express";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("You are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("You can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("You can delete all accounts")
// })

//delete
router.delete("/:id", verifyUser, deleteUser);

//update
router.put("/:id", verifyUser, updateUser);

//get
router.get("/:id", verifyUser, getUser);

//getall
router.get("/", verifyAdmin, getAllUsers);

export default router;
