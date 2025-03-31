const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total_likes = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
  return total_likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return {}

  let favorite = blogs[0]

  blogs.forEach(element => {
    if (element.likes > favorite.likes)
      favorite = element
  });

  return favorite_blog = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}

  const grouped_by_author = lodash._(blogs).groupBy('author').map((items, author)=> ({author: author,blogs: items.length
  })).value();

  // console.log("Blogs grouped by authors: ", grouped_by_author)

  const sorted_groups = lodash.sortBy(grouped_by_author, [function (o) {return o.blogs}])

  // console.log("Grouped blogs sorted into ascending order", sorted_groups)

  const most_blogs = sorted_groups[sorted_groups.length - 1]

  // console.log("Author with most blogs, and how many blogs: ", most_blogs)

  return most_blogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}