import { Express } from 'express'

import { authRoutes } from './auth'
import { userRoutes } from './user'
import { collectionRoutes } from './collection'
import { fileRoutes } from './file'

function routes(app: Express) {
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/collection', collectionRoutes)
  app.use('/file', fileRoutes)
}

export { routes }
