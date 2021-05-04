const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const notFound = require('./middlewares/notFound')
const errorResponse = require('./middlewares/errorResponse')

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

const apiRouter = require('./routes/api')

const app = express()

app.use(morgan('combined'))

app.use(express.json())

app.use('/api', apiRouter)

app.use(notFound)
app.use(errorResponse)

module.exports = app
