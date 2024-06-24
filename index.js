import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './src/config/db.config.js'
import { errorHandler } from './src/utils/errorHandler.js'
import router from './src/routes/index.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('./src/uploads'))


// Global error handler
app.use(errorHandler)

// Router v1
app.use(router)

//Connecting to the database and starting the server
db.query('SELECT 1')
  .then(() => {
    console.log('Database connection successful')
    app.listen(PORT, () => {
      console.log(`Serving on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error(`Error occured when connection: ${error}`)
  })
