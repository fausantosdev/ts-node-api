import { connection } from './database/knex/connection'
import { env } from './env'

import { server } from './server/server'

const startServer = () => {
  server.listen(env.PORT, () => {
    console.log('~ server is running')
  })
}

const bootstrap = async () => {
  try {
    await connection.raw('select 1+1 as result')
    console.log('~ database connection successful')

    startServer()
  } catch (err) {
    console.error('x failed to start the application:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

bootstrap()
