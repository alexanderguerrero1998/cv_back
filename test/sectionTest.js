import mongoose, { mongo } from "mongoose";
import { connect_db } from "../config/connect_db.js";
import { app } from "../app.js";
import supertest from "supertest";
import assert from "node:assert";
import { test, after, before } from "node:test";

before(async function () {
  await connect_db();
});
after(async function () {
  await mongoose.connection.close();
});

test("GET /api/section", async function () {
  const response = await supertest(app).get("/api/section");

  assert.strictEqual(response.statusCode, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length > 0);
  assert.ok(response.body[0].title);
});

test("GET /api/section/:id - should return 404 if no find", async function () {
  const idFake = "00000";
  const response = await supertest(app).get(`/api/section/${idFake}`);
  assert.strictEqual(response.statusCode, 404);
});

let idSection;

test("POST /api/section", async function () {
  const response = await supertest(app).post("/api/section").send({
    title: "TestPortfolio",
    type: "external",
    subtitle: "My open source repositories",
    url: "https://github.com/alcon",
    icon: "pi pi-github",
    color: "#8b5cf6",
    order: 3,
    active: true,
  });

  assert.strictEqual(response.statusCode, 201);
  assert.ok(response.body._id);
  assert.ok(response.body.title, "TestPortfolio");
  idSection = response.body._id;
});

test("PUT /api/section/:id", async function () {
  const response = await supertest(app).put(`/api/section/${idSection}`).send({
    title: "AnyTitle",
    type: "external",
    subtitle: "My open source repositories",
    url: "https://github.com/alcon",
    icon: "pi pi-github",
    color: "#8b5cf6",
    order: 3,
    active: true,
  });
  assert.strictEqual(response.statusCode, 200);
});

test("DELETE /api/section/", async function () {
  const response = await supertest(app).delete(`/api/section/${idSection}`);
  assert.strictEqual(response.statusCode, 200);
});
