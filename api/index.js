import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const cnt = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to backend");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!")
})


//middlewares...

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err,req,res,next)=>{
  const errMess = err.message || "Something went wrong";
  const errStat = err.status || 500
  return res.status(errStat).json({
    success:false,
    status:errStat, 
    message:errMess,
    stack: err.stack,
  })
})

app.listen(8000, () => {
    cnt();
});

