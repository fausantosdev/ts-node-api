import { Express } from 'express'

import { authRoutes } from './auth'
import { userRoutes } from './user'
import { itemRoutes } from './item'

function routes(app: Express) {
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/item', itemRoutes)
}

export { routes }
