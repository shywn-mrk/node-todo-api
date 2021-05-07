import express, { Router } from 'express'

import {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todos'

import authorizeUser from '../middlewares/authorizeUser'

const router: Router = express.Router()

router.use(authorizeUser)

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