const User = require("../models/User");
const jwt = require("jsonwebtoken");
const userExtractor = async (request, response, next) => {
  const token = request.token;
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;
  if (!decodedToken || !decodedToken.id) {
    return next();
  }
  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = userExtractor;
