import mongoose from "mongoose";

async function connect_db() {
  try {
    await mongoose.connect("mongodb://localhost:27017/dbcv");
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    if (error.name === "MongooseServerSelectionError") {
      console.log(error.message); // This isn't an error specific, it could be any error
      throw error;
    } else if (error.name === "MongoServerError") {
      console.log("Authentication failed");
      throw error;
    } else if (error.name === "MongoParseError") {
      console.log("Invalid connection string");
      throw error;
    } else {
      console.log("Failed to connect to database");
      console.log(error.name);
      throw error;
    }
  }
}

export { connect_db };
