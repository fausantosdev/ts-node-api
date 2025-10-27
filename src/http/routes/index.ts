import { Express } from 'express'

import { authRoutes } from './auth'
import { userRoutes } from './user'
import { collectionRoutes } from './collection'

function routes(app: Express) {
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/collection', collectionRoutes)
}

export { routes }
