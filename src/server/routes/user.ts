import { Router } from 'express'

import { userController } from '../controllers'
import { ensureAuthenticated } from '../middleware'

const userRoutes = Router()

userRoutes.post(
  '/',
  userController.createUserValidation,
  userController.create
)

userRoutes.get(
  '/',
  ensureAuthenticated,
  userController.getAllQueryValidation,
  userController.getAll
)

userRoutes.get(
  '/:id',
  ensureAuthenticated,
  userController.getByIdParamsValidation,
  userController.getById
)

userRoutes.put(
  '/:id',
  ensureAuthenticated,
  userController.updateValidation,
  userController.update
)

userRoutes.delete(
  '/:id',
  ensureAuthenticated,
  userController.deleteByIdValidation,
  userController.deleteById
)

export { userRoutes }
