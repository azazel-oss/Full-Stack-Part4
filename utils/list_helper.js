const _ = require("lodash");
const dummy = (_) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, blog) => {
    if (!acc.likes) {
      return blog;
    }
    if (acc.likes < blog.likes) {
      return blog;
    }
    return acc;
  }, []);
};

const mostBlogs = (blogs) => {
  const authorCount = _.countBy(blogs, "author");
  let result = { author: "", blogs: 0 };
  for (const authorCountKey in authorCount) {
    if (!result.blogs || result.blogs < authorCount[authorCountKey]) {
      result = {
        author: authorCountKey,
        blogs: authorCount[authorCountKey],
      };
    }
  }
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
