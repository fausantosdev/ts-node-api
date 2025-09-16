import * as path from 'path'
import { Knex } from 'knex'

import { env } from '../../env'

export const development: Knex.Config = {
  client: env.DB_CLIENT,
  connection:  {
    connectionString: env.DATABASE_URL,
  },
  debug: env.NODE_ENV === 'development',
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds')
  }
}

export const test: Knex.Config = {
  ...development
}

export const production: Knex.Config = {
  ...development
}
