import { knex } from 'knex'
import { development, test, production } from './environment'

function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production
    case 'test':
      return test
    default:
      return development
  }
}

const connection = knex(getEnvironment())

export { connection }
