import { userProvider } from '../../database/providers'
import { UpdateUserDTO } from '../../dtos/update-user-dto'
import { AppError } from '../../shared/utils/errors/app-error'


type UpdateUserTypes = {
 id: number,
 data: UpdateUserDTO
}

const updateUser = async ({ id, data }: UpdateUserTypes): Promise<number | Error> => {
  try {
    const userExists = await userProvider.getById(id)

    if (!userExists) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (data.email) {
      const userWithEmailExists = await userProvider.getByEmail(data.email)

      if (userWithEmailExists && userWithEmailExists.id !== id) {
        throw new AppError('Já existe um usuário com este email', 400)
      }
    }

    const result = await userProvider.update({ data, where: { id } })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { updateUser }
