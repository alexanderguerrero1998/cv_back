import { connect_db } from "../config/connect_db.js";
import { User } from "../models/user.js";

await connect_db();

// Use new User() when you need insert one objec, no more!
const user = new User({
  email: "admin@portfolio.com",
  password: "Mifamilia12",
});

await user.save();
console.log("User created:", user.email);
process.exit(0);
