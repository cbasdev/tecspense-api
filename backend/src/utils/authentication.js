import bcrypt from 'bcrypt'
import { environment } from '../../env/environment'

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(environment.saltRounds)
  return bcrypt.hash(password, salt)
}

module.exports = { encryptPassword }
