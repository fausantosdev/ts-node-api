import { Router } from 'express'

import { authController } from '../controllers'
import { ensureAuthenticated } from '../middleware'

const authRoutes = Router()

authRoutes.post(
  '/sign-in',
  authController.logInValidation,
  authController.logIn
)

authRoutes.get(
  '/me',
  ensureAuthenticated,
  authController.getAuthUser
)

authRoutes.post(
  '/refresh-token',
  authController.tokenRefresh
)

authRoutes.post(
  '/forgot-password',
  authController.forgotPassValidation,
  authController.forgotPass
)

authRoutes.post(
  '/reset-password',
  authController.resetPassValidation,
  authController.resetPass
)

export { authRoutes }
