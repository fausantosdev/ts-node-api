import * as path from 'path'
import { Knex } from 'knex'
import 'dotenv/config'

export const development: Knex.Config = {
  client: 'pg',
  useNullAsDefault: true,
  connection: process.env.PG_CONNECTION_STRING!,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds')
  }
}

export const test: Knex.Config = {
  ...development,
  connection: ':memory:'
}

export const production: Knex.Config = {
  ...development
}
