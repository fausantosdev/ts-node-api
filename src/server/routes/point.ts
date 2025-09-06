import { Router } from 'express'

import { userController } from '../controllers'

const userRoutes = Router()

userRoutes.post(
  '/',
  userController.createBodyValidator,
  userController.create
)

export { userRoutes }
