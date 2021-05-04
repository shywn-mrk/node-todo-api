const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 8000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT}`)
})
