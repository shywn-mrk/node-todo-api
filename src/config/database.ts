import mongoose from 'mongoose'

class DBConnection {
  constructor() {
    mongoose
      .connect(
        process.env.MONGO_URL as string,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => console.log('Mongo Connected'))
      .catch(error => {
        console.error('Connection Error: ', error.message)
      })
  }
}

export default DBConnection
