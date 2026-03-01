
import { logIn, logInValidation } from './log-in'
import { tokenRefresh } from './token-refresh'

const authController = {
  logIn,
  logInValidation,
  tokenRefresh
}

export { authController }
