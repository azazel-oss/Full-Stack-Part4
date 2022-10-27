const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const extractToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.split(" ")[1];
  }
  return null;
};

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const { title, url, likes, author } = request.body;
  if (!title || !url) {
    return response.status(400).json({
      message: "not valid blog request",
    });
  }
  if (!likes) {
    request.body.likes = 0;
  }

  const token = extractToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    url,
    likes,
    author,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs.push(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
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
