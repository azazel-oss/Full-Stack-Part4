const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");

const api = supertest(app);

describe("testing api get method", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs returned have correct number of blog posts", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(1);
  });

  test("blogs returned have unique property named id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    console.log(blogs);
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
