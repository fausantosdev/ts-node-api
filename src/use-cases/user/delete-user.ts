import { userProvider } from '../../database/providers'
import { AppError } from '../../shared/utils/errors/app-error'

const deleteUser = async (id: number): Promise<number | Error> => {
  try {
    const userExists = await userProvider.getById(id)

    if(!userExists){
      throw new AppError('Usuário não encontrado', 404)
    }

    const userRemoved = await userProvider.remove({ id })

    return userRemoved

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { deleteUser }
