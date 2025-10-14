import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'

const deleteUser = async (id: number): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getById(id)

    if(!userExists){
      throw new AppError('Usuário não encontrado', 404)
    }

    const userRemoved = await userRepository.remove({ id })

    return userRemoved

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { deleteUser }
