const dummy = (blogs) => {
    let number = 1
    for (let index = 0; index < blogs.lenght; index++) {
        number = index - index + 1
    }
    return number
}

const totalLikes = (blogs) => {
    let total = 0
    for (let index = 0; index < blogs.length; index++) {
        total += blogs[index].likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let favoriteIndex = 0
    if (blogs.length === 0) {
        return {}
    }
    for (let index = 0; index < blogs.length; index++) {
        if (index === 0) {
            favoriteIndex = index
        }
        else if (blogs[index].likes > blogs[favoriteIndex].likes) {
            favoriteIndex = index
        }
    }
    return blogs[favoriteIndex]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}