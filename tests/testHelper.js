const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}