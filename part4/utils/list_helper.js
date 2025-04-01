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

const addArrayElements = (arr) => {
  const sum = arr.reduce((total, num) => total + num, 0)
  return sum
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  const grouped_by_author = lodash._(blogs).groupBy('author').map((items, author) => ({author: author,likes: lodash.map(items, 'likes')
  })).value();

  // console.log("Blogs grouped by authors: ", grouped_by_author)

  const likes_reduced = grouped_by_author.map((element) =>
    {
      return {
        author: element.author, likes: addArrayElements(element.likes)
      }
    }
  )

  //console.log("Likes summed together: ", likes_reduced)
  
  const sorted_by_likes = lodash.sortBy(likes_reduced, [function (o) {return o.likes}])

  // console.log("Sorted by likes: ", sorted_by_likes)

  const most_likes = sorted_by_likes[sorted_by_likes.length - 1]

  // console.log("Most likes: ", most_likes)

  return most_likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}