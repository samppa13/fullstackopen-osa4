const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./testHelper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('tuonenmarja', 10)
        const user = new User({ username: 'paavoR', name: 'Paavo Runtti', passwordHash })
        await user.save()
    })

    test('user is returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('one user is returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    })
})

describe('addition of a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('tuonenmarja', 10)
        const user = new User({ username: 'paavoR', name: 'Paavo Runtti', passwordHash })
        await user.save()
    })

    test('a valid user can be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'pekka35',
            name: 'Pekka Rinne',
            password: 'drowssap'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'paavoR',
            name: 'Paavo Rukka',
            password: 'drowpass'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user without username is not added', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            name: 'Tuukka Rask',
            password: 'goodpassword'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('Path `username` is required')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user is not added if username is less than the minimum allowed length (3)', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'tr',
            name: 'Tuukka Rask',
            password: 'vaikeasalasana'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('Path `username` (`tr`) is shorter than the minimum allowed length (3).')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user without password is not added', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'tuukka',
            name: 'Tuukka Rask'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password missing')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user is not added if password is less than the minimum allowed length (3)', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'tuukka',
            name: 'Tuukka Rask',
            password: 'ss'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('Password (\'ss\') is shorter than the minimum allowed length (3).')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})