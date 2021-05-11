import App from './app'
import dotenv from 'dotenv'

dotenv.config({
  path: '../.env'
})

const PORT: any = process.env.PORT || 5000
const HOST: string = '0.0.0.0'

const server = new App()

server.start(PORT, HOST)

export default server
