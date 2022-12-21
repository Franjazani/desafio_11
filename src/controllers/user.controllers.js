import passport from "passport";

const passportOptions = {
  badRequestMessage: "Error. Usuario o contraseña inválidos.",
};

export const signUp = (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);
    res.json({ msg: "Bienvenido!!!" });
  })(req, res, next);
};

export const login = (req, res, next) => {
  passport.authenticate("login", passportOptions, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);
    res.json({ msg: `Hola${req.user}`, user: req.user });
  })(req, res, next);
};

export const getHome = (req, res) => {
  res.json(req.session);
};

export const logOut = (req, res) => {
  req.logOut();
  res.json({ message: "Vuelve Pronto!!!" });
};