const Blog = require('../models/Blog')

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

module.exports = {
    initialBlogs,
    blogsInDB,
    nonExistingID
}