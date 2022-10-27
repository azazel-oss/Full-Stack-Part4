const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  console.log(blogs);
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

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = request.body;
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.status(200).json({
    message: "blog updated successfully",
    data: result,
  });
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const result = await Blog.findByIdAndDelete(id);
  response.status(204).json({
    message: "blog deleted successfully",
    result,
  });
});

module.exports = router;
