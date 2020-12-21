const Todos = require('../models/todo')

const addTodo = async (req, res) => {
  const { text, completed } = req.body

  if (text !== undefined && completed !== undefined) {
    const todo = new Todos({
      text,
      completed
    })
    todo.save()

    res.json(todo)
  } else {
    res.status(400)
    res.json({
      success: false,
      msg: 'Invalid credentials'
    })
  }
}

const getTodo = async (req, res) => {
  const { id } = req.params

  const response = await Todos.findOne({ _id: id })

  if (response) {
    res.json(response)
  } else {
    res.status(404)
    res.json({
      success: false,
      msg: 'Not Found'
    })
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({})

    res.json(todos)
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        msg: 'Something went wrong while getting todos'
      })
  }
}

const updateTodo = async (req, res) => {
  const { id } = req.params
  const { text, completed } = req.body

  const todo = await Todos.findOne({ _id: id })

  if (!todo) {
    res.status(404)
    res.json({
      success: false,
      msg: 'Not Found'
    })
  } else if (text !== undefined && completed !== undefined) {
    await todo.update({
      text,
      completed
    })

    res.json(todo)
  } else {
    res.status(400)
    res.json({
      success: false,
      msg: 'Invalid credentials'
    })
  }
}

const deleteTodo = async (req, res) => {
  const { id } = req.params

  await Todos.deleteOne({ _id: id})

  res.send().status(200)
}

module.exports = { getTodos, addTodo, getTodo, updateTodo, deleteTodo }
