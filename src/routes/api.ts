import express, { Application, Router } from 'express'

import TodosRouter from './todos'
import UsersRouter from './users'

class APIRouter {
  private router: Router

  constructor(route: string, app: Application) {
    this.router = express.Router()
    
    new UsersRouter('/users', this.router)
    new TodosRouter('/todos', this.router)

    app.use(route, this.router)
  }
}

export default APIRouter
