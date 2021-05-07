import { Schema, model } from 'mongoose'

const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
}, {
  versionKey: false
})

export default model('User', User)
