import { pool } from '../database/database'
import { defaults } from 'pg'

export class User {
  constructor(name_user, email, password) {
    this.name_user = name_user
    this.email = email
    this.password = password
  }

  async saveUser() {
    const res = await pool.query(
      `insert into users (name_user, email, password) values (
        '${this.name_user}',
        '${this.email}',
        '${this.password}'
        )`
    )
    return 'ok'
  }
}
