import { User } from '../../database/knex/models'
import { userRepository } from '../../database/repositories'

import { AppError } from '../../shared/utils/errors/app-error'

import { deleteFile } from '../file'

type UpdateUserAvatarInput = {
  userId: string | number
  avatar: string
}

const updateUserAvatar = async ({ userId, avatar }: UpdateUserAvatarInput): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getById(Number(userId))

    if (!userExists) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (userExists.avatar) await deleteFile({ name: userExists.avatar })

    const user = new User()
    user.avatar = avatar

    const result = await userRepository.update({ data: user, where: { id: Number(userId) } })

    return result

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode ?? 500)
  }
}

export { updateUserAvatar }
