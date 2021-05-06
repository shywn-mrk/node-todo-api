import express, { Router } from 'express'
import {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todos'

const router: Router = express.Router()

router
  .route('/')
  .get(getTodos)
  .post(addTodo)

router
  .route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo)

export default router