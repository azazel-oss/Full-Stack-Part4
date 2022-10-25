const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const { title, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).json({
      message: "not valid blog request",
    });
  }
  if (!likes) {
    request.body.likes = 0;
  }

  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});
module.exports = router;
