import passport from "passport";
import { Router } from "express";
import { signUp, login, getHome, logOut } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/user.middlewares.js";

const router = Router();

const passportOptions = {
  badRequestMessage: "Error. Usuario o contraseña inválidos.",
};

router.post("/signup", signUp);

router.post("/login", passport.authenticate("login", passportOptions), login);

router.get("/home", isLoggedIn, getHome);

router.get("/logout", isLoggedIn, logOut);

export default router;