import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../model/user.model.js";

const strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

const signup = async (req, username, password, done) => {
  console.log("Sign Up");
  try {
    const query = { username: username };
    const user = await UserModel.findOne(query);

    if (user) {
      return done(null, false, { message: "usuario existente" });
    }
    const newUser = new UserModel({ username, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(null, false, { message: "ERROR", error });
  }
};

const login = async (req, username, password, done) => {
  console.log("Login");
  try {
    const query = { username: username };
    const user = await UserModel.findOne(query);
    if (!user) {
      return done(null, false, { message: "El usuario no existe" });
    } else {
      const match = await user.matchPassword(password);
      if (match) {
        console.log("Usuario existente");
        return done(null, user);
      } else return done(null, false);
    }
  } catch (error) {
    return done(null, false, { message: "ERROR", error });
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
  console.log("Ejecutando Serialize");
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  console.log("Ejecutando Deserialize");
  const user = await UserModel.findById(userId);
  return done(null, user);
});