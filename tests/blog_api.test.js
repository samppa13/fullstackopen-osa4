const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testHelper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property of the blogs posts is named id', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body.map(r => r.id)
        expect(id).toBeDefined()
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            _id: '7d424ed91374dab8536a31b1',
            title: 'Best Saves',
            author: 'Veini Vehviläinen',
            url: 'http://www.goalie.com/hockey/bestsaves',
            likes: 9,
            __v: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'Best Saves'
        )
    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            _id: '7d424ed91374dab8536a31b1',
            title: 'Best Saves',
            author: 'Veini Vehviläinen',
            url: 'http://www.goalie.com/hockey/bestsaves',
            __v: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        const list_likes = blogsAtEnd.map(b => b.likes)
        expect(list_likes).toContain(0)
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            _id: '7d424ed91374dab8536a31b1',
            author: 'Veini Vehviläinen',
            url: 'http://www.goalie.com/hockey/bestsaves',
            likes: 19,
            __v: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
        const newBlog = {
            _id: '7d424ed91374dab8536a31b1',
            title: 'Best Saves',
            author: 'Veini Vehviläinen',
            likes: 19,
            __v: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '639431037'
        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})