import UserModel from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// Generate Access and Refresh Tokens
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.Access_JWT_Secret, {
    expiresIn: "6h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.Refresh_JWT_Secret, {
    expiresIn: "6h",
  });
};

export const registerUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { Username, Fullname, email, password } = req.body;

    if (!Username || !Fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: "User already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a profile image" });
    }

    const ProfileImage = req.file.path; 

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const createUser = await UserModel.create({
      Username,
      Fullname,
      email,
      password: hashedPassword,
      ProfileImage,
    });

    console.log("User created:", createUser);

    res.status(201).json({ message: "User registered successfully", data: createUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.Username,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "User logged out successfully" });
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token found!" });

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.Refresh_JWT_Secret);

    const user = await UserModel.findOne({ email: decodedToken.email });

    if (!user) return res.status(404).json({ message: "Invalid token" });

    const newAccessToken = generateAccessToken(user);
    res.json({ message: "Access token generated", accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
