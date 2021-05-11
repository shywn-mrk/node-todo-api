import express, { Router } from 'express'

import UsersController from '../controllers/users'

class UsersRouter {
  private router: Router
  private controller

  constructor(route: string, router: Router) {
    this.router = express.Router()
    this.controller = new UsersController()
    
    this.router.post("/login", this.controller.login)
    this.router.post("/signup", this.controller.signup)

    router.use(route, this.router)
  }
}

export default UsersRouter
