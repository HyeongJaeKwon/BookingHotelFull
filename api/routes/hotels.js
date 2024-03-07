import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getRooms,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//create
router.post("/", verifyAdmin, createHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//update
router.put("/:id", verifyAdmin, updateHotel);

//get
router.get("/find/:id", getHotel);

//getall
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:hotelid", getRooms);

export default router;
