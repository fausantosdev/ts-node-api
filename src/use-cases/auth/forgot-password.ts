import { userRepository } from '../../database/repositories'
import { ForgotPasswordDTO } from '../../dtos/forgot-password-dto'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'
import { mail } from '../../shared/services/mail'

const forgotPassword = async ({ email }: ForgotPasswordDTO): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getByEmail(email)

    if(!userExists) return 0

    const hash = encrypt.random()

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const updatedId = await userRepository.update({
      where: { id: userExists.id },
      data: {
        password_reset_token: hash,
        password_reset_expires: now
      }
    })

    if(!updatedId) throw new AppError('Falha ao gerar o token', 401)// Ou 'return 0'

    await mail.send(
      email,
      'Recuperação de senha',
      `Use o seguinte token para recuperar sua senha: ${hash}. O token expira em 1 hora.`
    )

    return updatedId

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { forgotPassword }
