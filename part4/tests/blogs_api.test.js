const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blog')

beforeEach(async () =>  {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs)
    {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test("getting all entries, asserting correct http status code and content type", async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test("getting all entries, asserting that it does return all entries", async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})