import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateAvailability,
  updateRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom);

//delete
router.delete("/:roomid/:hotelid", verifyAdmin, deleteRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateAvailability);

//get
router.get("/:id", getRoom);

//getall
router.get("/", getAllRooms);

export default router;
