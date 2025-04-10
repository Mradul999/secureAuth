import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

//what is passport.js

//Passport.js is a Node.js library for authentication. It simplifies the process
// of integrating various authentication strategies
//(e.g., username/password, OAuth, social logins like Google, Facebook, GitHub) into your application
//bcrypt is a librarry used to hash password ie making it secure before storing in the database
// Define local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // in this done function is a callback function  that is used to signal the outcome of the authentication process

    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });

      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user); // Success
      else return done(null, false, { message: "Incorrect credentials" }); // Password mismatch
    } catch (error) {
      return done(error);
    }
  })
);

//basically the process of storing user information  into the session after  a successfull login is known as serialization

//and the process of fetching user details based on the information stored in the session is known as deserialization

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
