import express, {
    Application,
    Request,
    Response
} from 'express'
import mongoose from 'mongoose'
// import morgan from 'morgan'
import notFound from './middlewares/notFound'
import errorResponse from './middlewares/errorResponse'

mongoose
  .connect(
    'mongodb://mongo:27017/node-todo-api',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Mongo Connected'))
  .catch(error => {
    console.error('Connection Error: ', error.message)
  })

// import apiRouter from './routes/api'

const app: Application = express()

// app.use(morgan('combined'))

app.use(express.json())

// app.use('/api', apiRouter)
app.use('/', (req: Request, res: Response) => {
    res.send("Hello")
})

app.use(notFound)
app.use(errorResponse)

export default app
