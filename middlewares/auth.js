import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "./error.js";
import { CHATAPP_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[CHATAPP_TOKEN];
  if (!token)
    return next(new ErrorHandler("Authentication failed. Please log in to access this route", 401));

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id;
    next();
  } catch (error) {
    return next(new ErrorHandler("Authentication failed. Please log in to access this route", 401));
  }
});

const adminOnly = (req, res, next) => {
  const token = req.cookies["chatApp-admin-token"];

  if (!token)
    return next(new ErrorHandler("Access denied. Only admins can access this route", 401));

  try {
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
    const isMatched = secretKey === adminSecretKey;

    if (!isMatched)
      return next(new ErrorHandler("Access denied. Only admins can access this route", 401));

    next();
  } catch (error) {
    return next(new ErrorHandler("Access denied. Only admins can access this route", 401));
  }
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATAPP_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Authentication failed. Please log in to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Authentication failed. Please log in to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Authentication failed. Please log in to access this route", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthenticator };
