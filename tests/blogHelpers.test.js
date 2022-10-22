const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

	const listOfManyBlogs = [
		{
			_id: ("6353888627d65a7de1f6946f"),
			title: 'This is a title',
			author: 'Asad Mahmood',
			url: 'www.hoops.com',
			likes: 10,
			__v: 0
		},
		{
			_id: ("6353b0e95f0d2db327197e4d"),
			title: 'Another title',
			author: 'Asad Mahmood',
			url: 'www.hoops.com',
			likes: 23,
			__v: 0
		},
		{
			_id: ("6353b1005f0d2db327197e4f"),
			title: 'One more title',
			author: 'Asad Mahmood',
			url: 'www.hoops.com',
			likes: 48,
			__v: 0
		}
	]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

	test('when list has no blog, it equals to zero', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('when list has many blogs, equals the sum of their likes', () => {
		const result = listHelper.totalLikes(listOfManyBlogs)
		expect(result).toBe(81)
	})
})