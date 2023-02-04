require('dotenv').config()

let PORT = process.env.PORT
let MONGDB_URI = process.env.MONGDB_URI

module.exports = {
    MONGDB_URI,
    PORT
}