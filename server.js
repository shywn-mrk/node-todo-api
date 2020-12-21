const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const todosRouter = require('./routes/todos')

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/todos', todosRouter)

const PORT = process.env.PORT || 5000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Visit http://localhost:${PORT}`)
})
