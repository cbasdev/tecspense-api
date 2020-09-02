import express from 'express'
import { pool } from '../database/database'

// Importin Routes
import routes from '../routes/routes'
import expenses from '../routes/expenses'
// Initializaction
const app = express()

// Middelwares

// Routes
app.use('/api', routes)
app.use('/api/expenses', expenses)

const getUsers = async () => {
  const res = await pool.query('select * from users')
  console.log(res.rows)
}

export default app
