import { Router } from "express";
import { Section } from "../models/section.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const api = Router();

api.get("/", async function (request, response, next) {
  try {
    const sections = await Section.find();
    if (sections.length === 0) {
      response.status(404).json({ message: "Not found resource" });
      return;
    }
    response.status(200).json(sections);
  } catch (error) {
    next(error);
  }
});

api.get("/:id", async function (request, response, next) {
  try {
    const sectionId = await Section.findById(request.params.id);
    if (!sectionId) {
      response.status(404).json({ message: "Resource not found" });
      return;
    }
    response.status(200).json(sectionId);
  } catch (e) {
    if (e.name === "CastError") {
      // Mongoose throw  CastError when ObjectId is Not valid and this error go to: catch → next → 500
      response.status(404).json({ message: "Resource not found" });
    }
    next(e);
  }
});

api.post("/", isAuthenticated, async function (request, response, next) {
  try {
    const section = new Section(request.body);
    const saved = await section.save();
    response.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

api.put("/:id", isAuthenticated, async function (request, response, next) {
  try {
    // Search a Document
    const section = await Section.findByIdAndUpdate(
      request.params.id,
      request.body,
      { returnDocument: "after" },
    );

    // If not found Document return null
    if (!section) {
      response.status(404).json({ message: "Resource not found" });
      return;
    }
    response.status(200).json(section);
  } catch (e) {
    next(e);
  }
});

api.delete("/:id", isAuthenticated, async function (request, response, next) {
  try {
    // Search Document
    const section = await Section.findByIdAndDelete(request.params.id);

    // If not found Document return null
    if (!section) {
      response.status(404).json({ message: '"Resource not found"' });
      return;
    }
    response.json({ message: "Person deleted" });
  } catch (e) {
    next(e);
  }
});

api.use(function (request, response, next) {
  response.status(404).json({ message: "Source is not found." });
});

export { api };
