import { pool } from '../database/database'
import { defaults } from 'pg'

export class User {
  constructor(name_user, email, password) {
    this.name_user = name_user
    this.email = email
    this.password = password
  }

  async saveUser() {
    try {
      const res = await pool.query(
        `insert into users (name_user, email, password) values (
          '${this.name_user}',
          '${this.email}',
          '${this.password}'
          )`
      )
      console.log(res.rows)
      return this
    } catch (error) {
      return {
        error: error,
      }
    }
  }

  async findByEmail() {
    try {
      const user = await pool.query(
        `select id_user, name_user, email from users where email = '${this.email}' `
      )
      return user.rows
    } catch (error) {
      return {
        error: 'User not created',
        auth: false,
      }
    }
  }
}
