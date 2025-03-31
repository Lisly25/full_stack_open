
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}