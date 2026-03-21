import { Router } from 'express'

import { authController } from '../controllers'

const authRoutes = Router()

authRoutes.post(
  '/sign-in',
  authController.logInValidation,
  authController.logIn
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
