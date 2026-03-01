import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { jwt } from '../../shared/services/jwt'

const refreshToken = async (token: string): Promise<{
  user: { id: string | number, email: string },
  newToken: string } | Error> => {

  try {
    const decoded = jwt.decoded(token) as { id: string, email: string, role: string }

    const userExists = await userRepository.getByEmail(decoded.email)

    if(!userExists){
      throw new AppError('Falha na autenticação, verifique suas credenciais', 401)
    }

    const { id, email, role } = userExists

    const newToken = jwt.generate({ id, email, role })

    return {
      user: {
        id: userExists.id,
        email: userExists.email
      },
      newToken
    }

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { refreshToken }
