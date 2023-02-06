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

module.exports = {
    dummy,
    totalLikes
}