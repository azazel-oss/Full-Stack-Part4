const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");

const api = supertest(app);

describe("testing blog api get method", () => {
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
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("testing blog api post method", () => {
  test("if blog can't be added if no token is sent", async () => {
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
      .expect(403)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialNotes.length);
  });

  test("if a valid blog can be created when token is provided", async () => {
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
      .set({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvbGxhciIsImlkIjoiNjM1Y2M3YTY3MmMzOGJiMDMxNjFmYjA5IiwiaWF0IjoxNjY3MDMwMDA3fQ.PzVsjWVgqDdRuW83KnVmLLCOMT2YG5hgGvJrEeu9kIw",
      })
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

describe("testing api put method", () => {
  test("if api can update a blog post", async () => {
    const random = Math.ceil(Math.random() * 100000);
    const blogUpdate = {
      id: "6357d4e1f3866f15823357d2",
      title: "Random title" + random,
      author: "Random author" + random,
      url: "Random url" + random,
      likes: random,
    };
    const response = await api
      .put("/api/blogs/6357d4e1f3866f15823357d2")
      .send(blogUpdate)
      .expect(200);
    expect(response.body.data).toEqual(blogUpdate);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
