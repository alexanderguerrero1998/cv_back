import "dotenv/config";
import express from "express";
import { api as apiEducation } from "./routers/educationRouter.js";
import { api as apiPerson } from "./routers/personRouter.js";
import { api as apiPortfolio } from "./routers/portfolioRouter.js";
import { api as apiSection } from "./routers/sectionRouter.js";

import { connect_db } from "./config/connect_db.js";
import cors from "cors";
import session from "express-session";
import { passport } from "./config/passport.js";
import { apiAuth } from "./routers/authRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontendcv.netlify.app", // reemplaza con tu URL real de Netlify
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.get("/", function (request, response) {
  response.json({ message: "Hello!" });
});
app.use("/api/education", apiEducation);
app.use("/api/person", apiPerson);
app.use("/api/portfolio", apiPortfolio);
app.use("/api/section", apiSection);

app.use("/auth", apiAuth);

app.use(function (request, response) {
  response.status(404).send("Resource no fund!");
});

async function startServer() {
  await connect_db(); // First start the connexion with database
  app.listen(PORT, HOST, () => {
    console.log(`Server running in ${HOST}:${PORT}`);
  }); // Then start server
}

// Calls function startServer()
startServer().catch((error) => {
  console.log(error); // Here Its get all errors produce in connect_db
  process.exit(1); // If connexion fail, the better is off application
});

//export { app };
