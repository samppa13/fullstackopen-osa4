const listHelper = require('../utils/list_helper')

const listWithZeroBlog = []

const listWithOneBlog = [
    {
        _id: '7d644dd93e76d898456a39b1',
        title: 'Hockey goalie',
        author: 'Frans Tuohimaa',
        url: 'http://www.blogspot.com/hockeyGoalie',
        likes: 9,
        __v: 0
    }
]

const blogs = [
    {
        _id: '7d644dd93e76d898456a39b1',
        title: 'Hockey goalie',
        author: 'Frans Tuohimaa',
        url: 'http://www.blogspot.com/hockeyGoalie',
        likes: 9,
        __v: 0
    },
    {
        _id: '8c544fd42e766493426f32c6',
        title: 'Hockey goalie goals',
        author: 'Pekka Rinne',
        url: 'http://www.wordpress.com/hockey/goalie/goals',
        likes: 15,
        __v: 0
    },
    {
        _id: '75643d243e76a823446f3921',
        title: 'Goalie',
        author: 'Juuse Saros',
        url: 'http://www.blogspot.com/goalie/pro',
        likes: 10,
        __v: 0
    },
    {
        _id: '556a4ed23576d8a8446439cd',
        title: 'Goalie history',
        author: 'Jarmo Myllys',
        url: 'http://www.history.com/blogs/goalie',
        likes: 4,
        __v: 0
    }
]

test('dummy returns one', () => {
    const result = listHelper.dummy(listWithZeroBlog)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithZeroBlog)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(9)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(38)
    })
})

describe('favorite blog', () => {
    test('of empty list is empty object', () => {
        const result = listHelper.favoriteBlog(listWithZeroBlog)
        expect(result).toEqual({})
    })

    test('of one blog is the blog itself', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('of a bigger list is the most favorite blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[1])
    })
})