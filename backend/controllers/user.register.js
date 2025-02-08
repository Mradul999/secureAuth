import User from "../models/User.js";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import qrcode from "qrcode";

import dotenv from "dotenv";

dotenv.config();

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

// What is Speakeasy?
// Speakeasy is a Node.js library used for implementing Two-Factor Authentication (2FA)
//  and One-Time Passwords (OTP) in your application.

export const setup2fa = async (req, res) => {
  try {
    console.log("the requested user is :", req.user);
    const user = req.user;

    //generating a secret using speakeasy
    var secret = speakeasy.generateSecret();

    console.log(secret);
    // storing the secret in the database for later use
    user.twoFactorSecret = secret.base32;

    //saving changes in the database
    await user.save();

    //now we use qrcode npm library to generate a 2d barcode

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "secureAuth.com",
      encoding: "base32",
    });
    //this will geneate a image url for the qrcode  .we can use base64 string to image converter to see the generated qr
    // and the use extention like authenticator to scan that ar and geneate time based otp
    const qrImageURL = await qrcode.toDataURL(url);

    res.status(200).json({
      message: "secret generated successfully ",
      secret: secret.base32,
      qrcode: qrImageURL,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error setting up 2fa " });
  }
};
// here we will verify the genetated otp
export const verify2fa = async (req, res) => {
  const { token } = req.body;
  const user = req.user;
  //here we are veirfying the token coming from the body with the secret stored in the databse
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });
  //if verification done successfully we will assgin the user a jwt
  //  which will be used further for accessing the routes
  // also an expiry time for the token
  if (verified) {
    user.isMFAactive = true;
    const jwttoken = jwt.sign(
      { username: user.username },
      process.env.jwt_secret,
      { expiresIn: "1hr" }
    );
    await user.save();

    res.status(200).json({ message: "2fa successfull", token: jwttoken });
  } else {
    res.status(400).json({ message: "Invalid 2fa token" });
  }
};

export const reset2fa = async (req, res) => {
  try {
    const user = req.user;

    user.twoFactorSecret = "";
    user.isMFAactive = false;
    await user.save();
    res.status(200).json({ message: "2fa reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error occurred in resetting 2fa" });
  }
};
