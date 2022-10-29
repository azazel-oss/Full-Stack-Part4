const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const { title, url, likes, author } = request.body;
  const user = request.user;
  if (!user) {
    return response.status(403).json({
      error: "You need to be logged in to create a blog post",
    });
  }
  if (!title || !url) {
    return response.status(400).json({
      message: "not valid blog request",
    });
  }
  if (!likes) {
    request.body.likes = 0;
  }

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
  const user = request.user;

  const blogToDelete = await Blog.findById(id);
  if (user && blogToDelete.user.toString() === user._id.toString()) {
    user.blogs = user.blogs.filter((blog) => blog.toString() !== id);
    await Blog.findByIdAndDelete(id);
    await user.save();
  } else {
    return response.status(403).json({
      error: "not authorised to delete this",
    });
  }
  response.status(204).json({
    message: "blog deleted successfully",
  });
});

module.exports = router;
