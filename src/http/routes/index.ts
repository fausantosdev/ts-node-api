import { Express } from 'express'

import { authRoutes } from './auth'
import { userRoutes } from './user'

import { fileRoutes } from './file'


function routes(app: Express) {
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/file', fileRoutes)
}

export { routes }
