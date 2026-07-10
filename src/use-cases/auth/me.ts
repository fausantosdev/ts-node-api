import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'

const me = async (userId: string | number) => {
  try {
    const user = await userRepository.getById(userId)

    if(!user){
      throw new AppError('Falha na autenticação, verifique suas credenciais', 401)
    }

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { me }
