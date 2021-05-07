import express, { Router } from 'express'
import todosRouter from './todos'
import authRouter from './auth'

const router: Router = express.Router()

router.use('/auth', authRouter)
router.use('/todos', todosRouter)

export default router
