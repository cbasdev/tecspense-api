import { Pool } from 'pg'

import config from '../config/default.json'

const $db = config.db

export const pool = new Pool($db)
