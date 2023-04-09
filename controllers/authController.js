import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import colors from "colors";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) return res.json({ message: "ERROR,Name is required" });
    if (!email) return res.json({ message: "ERROR,Email is required" });
    if (!password) return res.json({ message: "ERROR,Password is required" });
    if (!phone) return res.json({ message: "ERROR,Phone number  is required" });
    if (!address) return res.json({ message: "ERROR,address is required" });

    //check user
    const existingUser = await userModel.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "Already registered,Please try login",
      });
    }

    //registering the user
    const hashedPassword = await hashPassword(password);

    // save  the user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();

    res.status(201).json({
      success: true,
      message: "User is Registered Successfully",
      user,
    });
  } catch (error) {
    console.log("Error occur while registering the user".bgRed.white, error);
    res.status(500).json({
      success: false,
      message: "Error occur while registering you",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    //  check user
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "The email is not registered",
      });

    // check for password
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });

    // creating token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    // sending the response
    res.status(200).json({
      success: true,
      message: "Successfully login",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log("Error occur while log in the user ".bgRed.white);
    res.status(500).json({
      success: false,
      message: "There is something wrong with Login",
      error,
    });
  }
};
