import { Router } from "express";
import { Portfolio } from "../models/portfolio.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const api = Router();

// Fists: Specific Routes
api.get("/", async function (request, response, next) {
  try {
    const portfolio = await Portfolio.find();
    if (!portfolio) {
      response.status(404).json("Portfolio not found");
      return;
    }
    response.status(200).json(portfolio);
  } catch (e) {
    next(e);
  }
});

api.get('/count', async function(request, response, next){
  try{
    const total = await Portfolio.countDocuments()
    response.status(200).json({total})
  } catch(e){
    next(e)  
  }

})

// Second: Dinamic Routes
api.get("/:id", async function (request, response, next) {
  try {
    const portfolio = await Portfolio.findById(request.params.id);
    if (!portfolio) {
      response.status(404).json({ message: "Portfolio not found" });
      return;
    }
    response.status(200).json(portfolio);
  } catch (e) {
    next(e);
  }
});

api.post("/", isAuthenticated, async function (request, response, next) {
  try {
    const portfolio = new Portfolio(request.body);
    const saved = await portfolio.save();
    response.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

api.put("/:id", isAuthenticated, async function (request, response, next) {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      request.params.id,
      request.body,
      { returnDocument: "after" },
    );
    if (!portfolio) {
      response.status(400).json({ message: "Portfolio no found" });
      return;
    }
    response.status(200).json(portfolio);
  } catch (e) {
    next(e);
  }
});

api.delete("/:id", isAuthenticated, async function (request, response, next) {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(request.params.id);
    if (!portfolio) {
      response.status(400).json({ message: "Portfolio delete" });
      return;
    }
    response.status(200).json(portfolio);
  } catch (e) {
    next(e);
  }
});

// Third: Comodin Rutes
api.use(function (request, response) {
  response.status(404).send("Resource no found portfolio!");
});

export { api };
