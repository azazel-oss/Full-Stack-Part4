const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./routes/BlogsRouter");
const usersRouter = require("./routes/UsersRouter");
const mongoose = require("mongoose");
const loginRouter = require("./routes/LoginRouter");
const tokenExtractor = require("./middlewares/tokenExtractor");
const userExtractor = require("./middlewares/userExtractor");

mongoose.connect(config.MONGODB_URI);
app.use(express.json());
app.use(cors());
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", userExtractor, blogsRouter);

module.exports = app;
