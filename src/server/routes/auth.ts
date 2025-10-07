import { Router } from 'express'

import { authController } from '../controllers'

const authRoutes = Router()

authRoutes.post(
  '/sign-in',
  authController.logInValidation,
  authController.logIn
)

export { authRoutes }
