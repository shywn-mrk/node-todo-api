import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT: any = process.env.PORT || 8000
const HOST: string = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT}`)
})
