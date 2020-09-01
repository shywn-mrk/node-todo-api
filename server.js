const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const todosRouter = require('./routes/todos')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/todos', todosRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Visit http://localhost:${PORT}`)
})
