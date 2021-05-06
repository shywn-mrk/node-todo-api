import {
  Request,
  Response,
  NextFunction
} from 'express'

import Todos from '../models/todo'
import TodoInterface from '../interfaces/TodoInterface'
import todoValidator from '../validations/todo'

const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData: TodoInterface = await todoValidator
      .validateAsync(req.body)
    const todo = new Todos(validatedData)
    await todo.save()

    res.json(todo)
  } catch (error) {
    next(error)
  }
}

const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const response = await Todos.findOne({ _id: id })

    if (!response) return next()

    res.json(response)
  } catch (error) {
    next(error)
  }
}

const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todos.find({})

    res.json(todos)
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const validatedData: TodoInterface = await todoValidator
      .validateAsync(req.body)

    const todo = await Todos.findOne({ _id: id })

    if (!todo) return next()

    await todo.update(validatedData)

    res.json(validatedData)
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await Todos.deleteOne({ _id: id })

    res
      .send()
      .status(200)
  } catch (error) {
    next(error)
  }
}

export {
  getTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo
}
