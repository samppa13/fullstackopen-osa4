const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')
const middlaware = require('./utils/middlaware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGDB_URI)
    .then(() => {
        logger.info('connected MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/blogs', blogsRouter)
app.use(middlaware.unknownEndpoint)
app.use(middlaware.errorHandler)

module.exports = app