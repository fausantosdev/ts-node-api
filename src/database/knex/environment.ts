import * as path from 'path'
import { Knex } from 'knex'

import { env } from '../../env'

export const development: Knex.Config = {
  client: env.DB_CLIENT,
  connection:  {
    connectionString: env.DATABASE_URL,
  },
  searchPath: ['development'],
  debug: true,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds')
  }
}

export const test: Knex.Config = {
  ...development,
  debug: false,
  searchPath: ['test']
}

export const production: Knex.Config = {
  ...development,
  debug: false,
  searchPath: ['public']
}
