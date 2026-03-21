import { userRepository } from '../../database/repositories'
import {ResetPasswordDTO } from '../../dtos/reset-password-dto'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'

const resetPassword = async ({ email, token, newPassword }: ResetPasswordDTO): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getByEmail(email)

    if(!userExists) throw new AppError('Email incorreto', 401)

    if(token !== userExists.password_reset_token) throw new AppError('Token inválido', 401)

    if(new Date() > userExists.password_reset_expires!) throw new AppError('Token inválido', 401)

    const newPasswordHash = await encrypt.hash(newPassword)

    const updatedId = await userRepository.update({
      where: { id: userExists.id },
      data: {
        password: newPasswordHash,
        password_reset_token: null,
        password_reset_expires: null
      }
    })

    if(!updatedId) throw new AppError('Ocorreu um erro, por favor tente novamente', 401)

    return updatedId

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { resetPassword }
