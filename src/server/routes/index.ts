import { Express } from 'express'

import { authRoutes } from './auth'
import { userRoutes } from './user'

function routes(app: Express) {
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
}

export { routes }
