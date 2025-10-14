import { userRepository } from '../../database/repositories'
import { UpdateUserDTO } from '../../dtos/update-user-dto'
import { AppError } from '../../shared/utils/errors/app-error'


type UpdateUserTypes = {
 id: number,
 data: UpdateUserDTO
}

const updateUser = async ({ id, data }: UpdateUserTypes): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getById(id)

    if (!userExists) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (data.email) {
      const userWithEmailExists = await userRepository.getByEmail(data.email)

      if (userWithEmailExists && userWithEmailExists.id !== id) {
        throw new AppError('Já existe um usuário com este email', 400)
      }
    }

    const result = await userRepository.update({ data, where: { id } })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { updateUser }
