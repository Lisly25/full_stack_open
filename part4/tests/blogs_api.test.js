const { test, after, beforeEach, describe } = require('node:test')
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

describe('Testing GET request', () => {
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

    test("checking if the unique identifier is named 'id' and not '_id'", async () => {
        const response = await api.get('/api/blogs')

        const valid_key = 'id'
        const invalid_key = '_id'

        assert.strictEqual(response.body[0].hasOwnProperty(valid_key), true)
        assert.strictEqual(response.body[0].hasOwnProperty(invalid_key), false)
        assert.strictEqual(mongoose.isValidObjectId(response.body[0].id), true)
    })
})

describe('Testing creating blogs with POST', () => {
    test("is it possible to add a new blog post", async () => {
        const original_state = await api.get('/api/blogs')

        const new_blog = {
            author: "New blogger",
            title: "Adding new blog",
            url: "new_blog.com/new",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(new_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const new_state = await api.get('/api/blogs')

        const contents = new_state.body.map(response => response.title)

        assert.strictEqual(original_state.body.length + 1, new_state.body.length)
        assert(contents.includes('Adding new blog'))
    })

    test("are the likes set to 0 if a blog is posted without the likes property being specified", async () => {
        const new_blog = {
            author: "No likes",
            title: "As in they are not specified",
            url: "new_blog.com/no_likes"
        }

        await api
            .post('/api/blogs')
            .send(new_blog)

        const new_state = await api.get('/api/blogs')

        const total_likes = new_state.body.reduce((total, num) => total + num.likes, 0)

        const old_total_likes = helper.initialBlogs.reduce((total, num) => total + num.likes, 0)

        // console.log("Original likes: ", old_total_likes, "Total likes:", total_likes)

        // Only checking the sum of likes - but if any blog missed the likes attribute, their sum would be NaN
        assert.strictEqual(total_likes, old_total_likes)
    })

    test("is a missing TITLE in a new blog resulting in a bad request response", async () => {
        const new_blog = {
            author: "No title",
            url: "new_blog.com/no_title"
        }

        await api
            .post('/api/blogs')
            .send(new_blog)
            .expect(400)
    })

    test("is a missing URL in a new blog resulting in a bad request response", async () => {
        const new_blog = {
            author: "No url",
            title: "This post has no url"
        }

        await api
            .post('/api/blogs')
            .send(new_blog)
            .expect(400)
    })
})

describe("testing removing blogs with DELETE", () => {
    test("removing an existing note from a valid ID", async () => {
        const original_state = await helper.blogsInDB()

        await api
            .delete(`/api/blogs/${original_state[0].id}`)
            .expect(204)

        const new_state = await helper.blogsInDB()

        assert.strictEqual(original_state.length - 1, new_state.length)

        const blog_titles = new_state.map(blog => blog.title)

        assert(!blog_titles.includes(original_state[0].title))
    })

    test("trying to use a string that is not a valid ID type", async () => {
        await api
            .delete('/api/blogs/foobar')
            .expect(400)
    })

    test("using a valid id, but the resource has already been removed", async () => {
        const removed_id = await helper.nonExistingID()

        await api
            .delete(`/api/blogs/${removed_id}`)
            .expect(204)
    })
})

after(async () => {
    await mongoose.connection.close()
})