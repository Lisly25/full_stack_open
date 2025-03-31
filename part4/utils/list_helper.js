
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total_likes = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
  return total_likes
}

module.exports = {
  dummy,
  totalLikes
}