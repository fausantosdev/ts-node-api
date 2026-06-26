import { User } from '../../database/knex/models'
import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'

type UpdateUserInput = {
  id: string | number
  data: {
    name?: string
    email?: string
    password?: string
  }
}

const updateUser = async ({ id, data }: UpdateUserInput): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getById(id)

    if (!userExists) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const user = new User()

    if(data.name) user.name = data.name

    if (data.email) {
      const userWithEmailExists = await userRepository.getByEmail(data.email)

      if (userWithEmailExists && userWithEmailExists.id !== id) {
        throw new AppError('Já existe um usuário com este email', 400)
      }

      user.email = data.email
    }

    if(data.password) {
      user.password = await encrypt.hash(data.password)
    }

    const result = await userRepository.update({ data: user, where: { id: Number(id) } })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { updateUser }
