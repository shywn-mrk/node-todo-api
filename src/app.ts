import express, {
  Application
} from 'express'

import DBConnection from './config/database'

import morgan from 'morgan'
import notFound from './middlewares/notFound'
import errorResponse from './middlewares/errorResponse'

import passport from 'passport'

import APIRouter from './routes/api'

class App {
  private app: Application

  constructor() {
    new DBConnection()

    this.app = express()

    this.app.use(morgan('combined'))

    this.app.use(express.json())

    this.app.use(passport.initialize())

    this.app.get('/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile'], session: false })
    )
    this.app.get('/auth/google/callback',
      passport.authenticate( 'google', {
        // successRedirect: '/auth/google/success',
        // failureRedirect: '/auth/google/failure',
        session: false,
    }))

    this.app.get('/auth/google/success', (req, res) => {
      res.json({message: "welcome!"})
    })

    this.app.get('/auth/google/failure', (req, res) => {
      res.json({message: "failed!"})
    })

    new APIRouter('/api', this.app)

    this.app.use(notFound)
    this.app.use(errorResponse)
  }

  public start = (port: any, host: string) => {
    this.app.listen(port, host, () => {
      console.log(`Server running on port ${port}`)
      console.log(`Visit http://localhost:${port}`)
    })
  }
}

export default App
