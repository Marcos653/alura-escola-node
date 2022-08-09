const supertest = require("supertest");
const app = require("../../index.js");

describe("Levels", () => {
  test("Get all levels", async () => {
    const response = await supertest(app).get("/niveis");
    expect(response.statusCode).toBe(200);
  });

});