import { Router } from 'express'

import { userController } from '../controllers'

const userRoutes = Router()

userRoutes.post(
  '/',
  userController.createUserValidation,
  userController.create
)

export { userRoutes }
