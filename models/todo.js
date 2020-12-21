const { Schema, model } = require('mongoose')

const Todo = new Schema({
    text: String,
    completed: Boolean
}, {
    versionKey: false
})

module.exports = model('Todo', Todo)
