import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //hashing the password random key
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
    password: hash,
      
    });

    await newUser.save();
    return res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const u = await User.findOne({ username: req.body.username });
    if (!u) return next(createError(404, "User not found"));

    const isCorrectPassword = bcrypt.compareSync(req.body.password, u.password);
    if (!isCorrectPassword)
      return next(createError(400, "Wrong Username or Password"));

    // jwt => creating web token to determine if administrator or no
    const token = jwt.sign({ id: u._id, idAdmin: u.isAdmin }, process.env.JWT);

    const { password, isAdmin, ...otherDocs } = u._doc;

    //when returning the login info => it sends with cookie/token
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({details:{ ...otherDocs}, isAdmin });

  } catch (err) {
    next(err);
  }
};
