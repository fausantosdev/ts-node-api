import { Express } from 'express'

import { userRoutes } from './point'

function routes(app: Express) {
  app.use('/user', userRoutes)
}

export { routes }
