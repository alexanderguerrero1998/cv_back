import { Router } from "express";
import { Person } from "../models/person.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const api = Router();

api.get("/", async function (request, response, next) {
  try {
    const person = await Person.find(); // find() method return [] If not found any person
    if (person.length === 0) {
      response.status(400).json({ message: "No person found" });
    } else {
      response.json(person);
    }
  } catch (e) {
    next(e);
  }
});

api.get("/:id", async function (request, response, next) {
  try {
    const personId = await Person.findById(request.params.id);
    if (!personId) {
      response.status(404).json({ message: "Resource not found" });
      return;
    }
    response.status(200).json(personId);
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
    const person = new Person(request.body);
    const saved = await person.save();
    response.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

api.put("/:id", isAuthenticated, async function (request, response, next) {
  try {
    const person = await Person.findByIdAndUpdate(
      request.params.id,
      request.body,
      { returnDocument: "after" },
    );
    if (!person) {
      response.status(404).json({ message: "Person not found" });
      return;
    }
    response.status(200).json(person);
  } catch (e) {
    next(e);
  }
});

api.delete("/:id", isAuthenticated, async function (request, response, next) {
  try {
    const person = await Person.findByIdAndDelete(request.params.id);
    if (!person) {
      response.status(404).json({ message: "Person not found" });
      return;
    }
    response.json({ message: "Person deleted" });
  } catch (e) {
    next(e);
  }
});

api.use(function (request, response) {
  response.status(404).send("Resource no found from person!");
});

export { api };
