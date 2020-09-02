import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { encryptPassword } from '../utils/authentication'
import { User } from '../models/User'
import { environment } from '../../env/environment'
const router = Router()

router.post('/register', async (req, res) => {
  const { name_user, email, password } = req.body
  const passwordEncrypted = await encryptPassword(password)
  const newUser = new User(name_user, email, passwordEncrypted)

  // Saving user in database
  const user = await newUser.saveUser()

  if (!user.error) {
    const token = jwt.sign({ user }, environment.secret_word, {
      expiresIn: 60 * 60 * 24,
    })
    res.json({ auth: true, token })
  } else {
    res.json({ auth: false, message: 'error creating user' })
  }
})

router.get('/me', async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided',
    })
  } else {
    const decoded = jwt.verify(token, environment.secret_word)
    const userDecoded = new User(
      decoded.user.name_user,
      decoded.user.email,
      decoded.user.password
    )
    const user = await userDecoded.findByEmail()
    console.log(user)
  }
  res.json({
    message: 'hola me',
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
