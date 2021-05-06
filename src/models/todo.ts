import { Schema, model } from 'mongoose'

const Todo = new Schema({
  text: {type: String, required: true},
  completed: {type: Boolean, required: true}
}, {
  versionKey: false
})

export default model('Todo', Todo)
