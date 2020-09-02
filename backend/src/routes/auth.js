import { Router } from 'express'
import jwt from 'jsonwebtoken'
import app from '../app/app'
import { encryptPassword } from '../utils/authentication'
import { User } from '../models/User'
const router = Router()

router.get('/', (req, res) => {
  res.json({
    message: 'hola',
  })
})

router.post('/register', async (req, res) => {
  const { name_user, email, password } = req.body
  console.log(req.body)
  const passwordEncrypted = await encryptPassword(password)
  const newUser = new User(name_user, email, passwordEncrypted)
  const users = await newUser.saveUser()
  // console.log(users)
  res.json({
    text: 'registro',
  })
})

router.post('/login', (req, res) => {
  const user = {
    name_user: 'node user',
    email: 'node@gmail.com',
    password: '123123',
  }
  const token = jwt.sign({ user }, 'say_one_with_the_force')
  res.json({
    token,
  })
})

router.get('/protected', ensureToken, (req, res) => {
  jwt.verify(req.token, 'say_one_with_the_force', (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        text: 'protected',
        data,
      })
    }
  })
})

function ensureToken(req, res, next) {
  console.log(req.headers)
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader
    next()
  } else {
    res.sendStatus(403)
  }
}

export default router
