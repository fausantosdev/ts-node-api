import { User } from '../../database/knex/models'
import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'

type ResetPasswordInput = {
  email: string
  token: string
  newPassword: string
}

const resetPassword = async ({ email, token, newPassword }: ResetPasswordInput): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getByEmail(email)

    if(!userExists) throw new AppError('Email incorreto', 401)

    if(token !== userExists.password_reset_token) throw new AppError('Token inválido', 401)

    if(new Date() > userExists.password_reset_expires!) throw new AppError('Token inválido', 401)

    const newPasswordHash = await encrypt.hash(newPassword)

    const user = new User()
    user.password_hash = newPasswordHash
    user.password_reset_token = null
    user.password_reset_expires = null

    const updatedId = await userRepository.update({
      where: { id: userExists.id },
      data: user
    })

    if(!updatedId) throw new AppError('Ocorreu um erro, por favor tente novamente', 401)

    return updatedId

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { resetPassword }
