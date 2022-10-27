const app = require("../app");
const supertest = require("supertest");
const User = require("../models/User");

const api = supertest(app);

describe("testing user GET method", () => {
  test("if api endpoint sends array of users", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(1);
  });
});

describe("testing user POST method", () => {
  test("if valid user is created successfully", async () => {
    await User.deleteMany({});
    const newUser = {
      username: "azazel",
      name: "Asad Mahmood",
      password: "simple",
    };
    await api.post("/api/users").send(newUser).expect(201);
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(1);
  });

  test("if user without a password is invalid", async () => {
    await User.deleteMany({});
    const inValidUser = {
      name: "Asad Mahmood",
      username: "azazel",
    };
    await api.post("/api/users").send(inValidUser).expect(403);
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(0);
  });

  test("if user without a username is invalid", async () => {
    await User.deleteMany({});
    const inValidUser = {
      name: "Asad Mahmood",
      password: "simple",
    };
    await api.post("/api/users").send(inValidUser).expect(403);
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(0);
  });

  test("if user with username smaller than 3 characters is invalid", async () => {
    await User.deleteMany({});
    const inValidUser = {
      username: "no",
      name: "Asad Mahmood",
      password: "simple",
    };
    await api.post("/api/users").send(inValidUser).expect(403);
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(0);
  });

  test("if user with password smaller than 3 characters is invalid", async () => {
    await User.deleteMany({});
    const inValidUser = {
      username: "azazel",
      name: "Asad Mahmood",
      password: "no",
    };
    await api.post("/api/users").send(inValidUser).expect(403);
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(0);
  });
});
