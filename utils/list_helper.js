const dummy = (blogs) => {
    let number = 1
    for (let index = 0; index < blogs.lenght; index++) {
        number = index - index + 1
    }
    return number
}

module.exports = {
    dummy
}