const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const apiRouter = require('./routes/api')

const app = express()

// DB connection
mongoose
    .connect(
        'mongodb://mongo:27017/node-todo-api',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('Mongo Connected'))
    .catch(error => {
        console.error('Connection Error: ', error.message)
    })

app.use(morgan('combined'))

app.use(express.json())

app.use('/api', apiRouter)

const PORT = process.env.PORT || 5000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Visit http://localhost:${PORT}`)
})
