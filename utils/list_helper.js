const dummy = (_) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((acc, blog) => {
		if (!acc.likes) {
			return blog
		}
		if (acc.likes < blog.likes) {
			return blog
		}
		return acc
	}, [])
}

module.exports = {
  dummy,
	totalLikes,
	favoriteBlog
}