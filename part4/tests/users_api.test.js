const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/User')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('User registration (POST) tests', () => {
    test('valid registration', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'tester',
        name: 'QA_Tester',
        password: 'djklsfn',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
})

describe('Retrieving user list with GET', () => {
    test('get all users', async () => {
        const response = await api.get('/api/users')

        assert.strictEqual(response.body[0].username, 'root')
    })
})

after(async () => {
    await mongoose.connection.close()
})