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

userRoutes.get(
  '/:id',
  userController.getByIdParamsValidation,
  userController.getById
)

userRoutes.put(
  '/:id',
  userController.updateValidation,
  userController.update
)

userRoutes.delete(
  '/:id',
  userController.deleteByIdValidation,
  userController.deleteById
)

export { userRoutes }
