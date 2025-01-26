import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    //extracting the username and password from the request body
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    //checking for the existing user with the same username
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "user with this username already exists" });
    }
    //securing the password by hashing it using bcrptjs library
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isMFAactive: false,
    });
    //saving the new user in the database
    await newUser.save();
    // console.log("User", newUser);

    //return a success message  to ensure that the user is successfully registered
    return res
      .status(200)
      .json({ message: "user registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  console.log("Authenticated user:", req.user);

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ message: "User not registered " });
    }

    const isMatch = bcrypt.compare(req.user.password, password);
    if (!isMatch) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "User login successfully",
      username: req.user.username,
      isMFAactive: req.user.isMFAactive,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStatus = async (req, res) => {
  try {
    console.log(req.user);

    if (req.user) {
      return res.status(200).json({
        message: "User is logged in",
        username: req.user.username,
        isMFAactive: req.user.isMFAactive,
      });
    } else {
      console.error("Unauthorized access attempt - No user in request");
      return res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
    console.error("An error occurred in getStatus controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "unauthorized user" });
  }
  req.logout((err) => {
    if (err) return res.status(400).json({ message: "user not logged in" });
    res.status(200).json({ message: "User logged out successfully" });
  });
};

export const setup2fa = async (req, res) => {};

export const verify2fa = async (req, res) => {};

export const reset2fa = async (req, res) => {};
