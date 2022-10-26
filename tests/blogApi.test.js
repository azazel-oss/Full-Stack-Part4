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

describe("testing api post method", () => {
  test("if a valid blog can be added", async () => {
    const initialResponse = await api.get("/api/blogs");
    const initialNotes = initialResponse.body;

    const noteToBeTested = {
      title: "How to work?",
      author: "test another author",
      url: "www.tobesearched.com",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(noteToBeTested)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialNotes.length + 1);
  });

  test("if a blog default like value is 0 if no like property is passed", async () => {
    const noteToBeTested = {
      title: "No likes on this post",
      author: "test another author",
      url: "www.tobesearched.com",
    };
    const response = await api.post("/api/blogs").send(noteToBeTested);
    expect(response.body.likes).toEqual(0);
  });

  test("if a blog with empty url or title is sent, returns a bad request response", async () => {
    const noteToBeTested = {
      title: "No url on this post",
      author: "test another author",
      likes: 5,
    };

    await api.post("/api/blogs").send(noteToBeTested).expect(400);
  });
});

describe("testing api delete method", () => {
  test("if delete works fine", async () => {
    await api.delete("/api/blogs/635846f96181c41bfb584d42").expect(204);
    const blogsResponse = await api.get("/api/blogs");
    expect(
      blogsResponse.body.find((blog) => blog.id === "635846f96181c41bfb584d42")
    ).toBeUndefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
