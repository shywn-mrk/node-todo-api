import express, { Router } from 'express'
import todosRouter from './todos'

const router: Router = express.Router()

router.use('/todos', todosRouter)

export default router
