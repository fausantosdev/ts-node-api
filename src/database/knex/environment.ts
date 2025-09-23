import * as path from 'path'
import { Knex } from 'knex'

import { env } from '../../env'

export const development: Knex.Config = {
  client: env.DB_CLIENT,
  connection:  {
    connectionString: env.DATABASE_URL,
  },
  searchPath: ['test'],
  debug: true,
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
  ...development,
  searchPath: ['public']
}
