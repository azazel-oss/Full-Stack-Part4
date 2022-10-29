const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);

describe("testing login api", () => {
  test("if wrong credentials return bad request", async () => {
    const credentials = {
      username: "dollar",
      password: "wrong",
    };

    await api.post("/api/login").send(credentials).expect(401);
  });

  test("if correct credentials return web token", async () => {
    const credentials = {
      username: "dollar",
      password: "password",
    };
    const response = await api.post("/api/login").send(credentials).expect(200);
    expect(response.body).toHaveProperty("token");
  });
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvbGxhciIsImlkIjoiNjM1Y2M3YTY3MmMzOGJiMDMxNjFmYjA5IiwiaWF0IjoxNjY3MDMwMDA3fQ.PzVsjWVgqDdRuW83KnVmLLCOMT2YG5hgGvJrEeu9kIw
