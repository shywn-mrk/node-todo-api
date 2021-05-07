import app from './app'
import dotenv from 'dotenv'

dotenv.config({
  path: '../.env'
})

const PORT: any = process.env.PORT || 5000
const HOST: string = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT}`)
})
