import express, { Router } from 'express'

import {
  auth,
  register
} from '../controllers/auth'

const router: Router = express.Router()

router.post("/", auth)

router.post("/register", register)

export default router
