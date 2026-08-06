export function isAuthenticated(request, response, next) {
  if (request.isAuthenticated()) return next();
  response.status(401).json({ message: "Unauthorized" });
}

// Uncomment below for make test routes
/*
export function isAuthenticated(request, response, next) {
  if (process.env.NODE_ENV === "test") return next();
  if (request.isAuthenticated()) return next();
  response.status(401).json({ message: "Unauthorized" });
}

 */
