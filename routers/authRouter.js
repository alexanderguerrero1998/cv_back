import { Router } from "express";
import { passport } from "../config/passport.js";

const api = Router();

// Login
api.post("/login", function (request, response, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) return response.status(401).json({ message: info.message });

    request.logIn(user, function (err) {
      if (err) return next(err);
      response
        .status(200)
        .json({ message: "Login successful", email: user.email });
    });
  })(request, response, next);
});

// Logout
api.post("/logout", function (request, response, next) {
  request.logout(function (err) {
    if (err) return next(err);
    response.status(200).json({ message: "Logout successful" });
  });
});

// Verificar sesión activa
api.get("/me", function (request, response) {
  if (request.isAuthenticated()) {
    return response.status(200).json({ email: request.user.email });
  }
  response.status(401).json({ message: "Not authenticated" });
});

export { api as apiAuth };
