import { Express } from 'express'

import { userRoutes } from './user'

function routes(app: Express) {
  app.use('/user', userRoutes)
}

export { routes }
