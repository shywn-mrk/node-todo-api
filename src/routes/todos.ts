import express, { Router } from 'express'

import TodosController from '../controllers/todos'

import authorizeUser from '../middlewares/authorizeUser'

class TodosRouter {
  private router: Router
  private controller

  constructor(route: string, router: Router) {
    this.router = express.Router()
    this.controller = new TodosController()
    
    this.router.use(authorizeUser)
    
    this.router
      .route('/')
      .get(this.controller.getTodos)
      .post(this.controller.addTodo)
    
    this.router
      .route('/:id')
      .get(this.controller.getTodo)
      .put(this.controller.updateTodo)
      .delete(this.controller.deleteTodo)

    router.use(route, this.router)
  }
}

export default TodosRouter
