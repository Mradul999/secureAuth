import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcryptjs";

import User from "../models/User.js";

passport.use(
  new LocalStrategy(function (username, password, done) {
    try {
        
    } catch (error) {
        
    }
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
