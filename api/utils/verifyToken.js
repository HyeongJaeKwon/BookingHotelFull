import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log("no token");
    return next(createError(401, "You are not authenticated!"));
  }
  console.log("yes token");

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Invalid token!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  try {
    verifyToken(req, res, next, (err) => {
      if (err) {
        return next(err);
      }

      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  } catch (err) {
    next(err);
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, (err) => {
    if (err) return next(err);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not admin"));
    }
  });
};
