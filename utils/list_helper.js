const dummy = (_) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

module.exports = {
  dummy,
	totalLikes
}