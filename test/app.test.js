const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("Playstore server Test", () => {
  it("Should render the whole json", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
      });
  });

  it("Should throw a 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "Sort must be either rating or app");
  });

  it("Should thow a 400 if genres is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ genres: "MISTAKE" })
      .expect(
        400,
        "Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'"
      );
  });
});
