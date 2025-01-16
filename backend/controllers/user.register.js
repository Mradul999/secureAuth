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


export const login=async(req,res)=>{
  
}
