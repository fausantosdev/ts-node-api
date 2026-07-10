
import { logIn, logInValidation } from './log-in'
import { tokenRefresh } from './token-refresh'
import { forgotPass, forgotPassValidation } from './forgot-pass'
import { resetPass, resetPassValidation } from './reset-pass'
import { getAuthUser } from './get-auth-user'

const authController = {
  logIn,
  logInValidation,
  tokenRefresh,
  forgotPass,
  forgotPassValidation,
  resetPass,
  resetPassValidation,
  getAuthUser
}

export { authController }
