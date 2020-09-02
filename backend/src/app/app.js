import express from 'express'

// Importin Routes
import auth from '../routes/auth'
import expenses from '../routes/expenses'

// Initializaction
const app = express()

// Settings
app.use(express.json())

// Middlewares

// Routes
app.use('/api', auth)
app.use('/api/expenses', expenses)

export default app
