import userModel from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";

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
