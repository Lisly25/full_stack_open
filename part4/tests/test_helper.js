const Blog = require('../models/Blog')
const User = require('../models/User')

const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        title: "First blog",
        author: "John Doe",
        url: "example.com/blog",
        likes: 3
    },
    {
        title: "Second blog",
        author: "Jane Doe",
        url: "foobar.com/blog",
        likes: 30
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingID = async () => {
    const blog = new Blog({
        author: "Author",
        title: "Will remove this",
        url: "example.com"
    })

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const createDummyUser = async () => {
    //To be able to test POST request - userID is 
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'Dummy', passwordHash })
    
    await user.save()
}

const getTokenForDummy = async (api) => {
    const credentials = {
        username: "Dummy",
        password: "sekret"
    }

    const response = await api
        .post('/api/login')
        .send(credentials)

    return response.body.token
}

const createDummyBlog = async (api, token) => {
    const new_blog = {
        author: "Dummy",
        title: "Dummy blog",
        url: "new_blog.com/dummy",
        likes: 0,
        userId: token.id
    }

    response = await api
        .post('/api/blogs')
        .set("Authorization", `Bearer ${token}`)
        .send(new_blog)
    
    return response.body
}

module.exports = {
    initialBlogs,
    blogsInDB,
    nonExistingID,
    usersInDb,
    createDummyUser,
    getTokenForDummy,
    createDummyBlog
}