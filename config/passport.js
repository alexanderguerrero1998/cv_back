import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.js";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done,
  ) {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      const valid = await user.verifyPassword(password);
      if (!valid) return done(null, false, { message: "Wrong password" });

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

export { passport };
