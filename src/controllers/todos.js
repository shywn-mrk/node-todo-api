const Todos = require('../models/todo')
const schemaValidator = require('../validations/todo')

const addTodo = async (req, res, next) => {
  try {
    const validatedData = await schemaValidator.validateAsync(req.body)
    const todo = new Todos(validatedData)
    await todo.save()

    res.json(todo)
  } catch (error) {
    next(error)
  }
}

const getTodo = async (req, res, next) => {
  try {
    const { id } = req.params
  
    const response = await Todos.findOne({ _id: id })

    if (!response) return next()

    res.json(response)
  } catch (error) {
    next(error)    
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({})

    res.json(todos)
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params

    const validatedData = await schemaValidator.validateAsync(req.body)

    const todo = await Todos.findOne({ _id: id })

    if (!todo) return next()

    await todo.update(validatedData)

    res.json(validatedData)
  } catch (error) {
    next(error)  
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params

    await Todos.deleteOne({ _id: id})

    res
      .send()
      .status(200)
  } catch (error) {
    next(error)
  }
}

module.exports = { getTodos, addTodo, getTodo, updateTodo, deleteTodo }
