const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./routes/BlogsRouter");
const usersRouter = require("./routes/UsersRouter");
const mongoose = require("mongoose");

mongoose.connect(config.MONGODB_URI);
app.use(express.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

module.exports = app;
