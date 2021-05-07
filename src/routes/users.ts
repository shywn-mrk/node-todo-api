import express, { Router } from 'express'

import {
  login,
  signup
} from '../controllers/users'

const router: Router = express.Router()

router.post("/login", login)

router.post("/signup", signup)

export default router
