import { Router } from 'express'

import { userController } from '../controllers'

const userRoutes = Router()

userRoutes.post(
  '/',
  userController.createUserValidation,
  userController.create
)

userRoutes.get(
  '/',
  userController.getAllQueryValidation,
  userController.getAll
)

export { userRoutes }
