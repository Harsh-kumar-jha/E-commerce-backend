import JWT from "jsonwebtoken";
import colors from "colors";
import userModel from "../models/userModel.js";

// protected routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error occur while logging in the user".bgRed.white, error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error occur in admin middleware".bgRed.white, error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};
