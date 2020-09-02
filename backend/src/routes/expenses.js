import { Router } from 'express'

const router = Router()

router.get('/expense', (req, res) => {
  res.json({
    message: 'Expense created',
  })
})

export default router
