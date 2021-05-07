import express, { Router } from 'express'

import todosRouter from './todos'
import usersRouter from './users'

const router: Router = express.Router()

router.use('/users', usersRouter)
router.use('/todos', todosRouter)

export default router
