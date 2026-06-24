import { User } from '../../database/knex/models'
import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'
import { mail } from '../../shared/services/mail'

type ForgotPasswordInput = {
  email: string
}

const forgotPassword = async ({ email }: ForgotPasswordInput): Promise<number | Error> => {
  try {
    const userExists = await userRepository.getByEmail(email)

    if(!userExists) return 0

    const hash = encrypt.random()

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const user = new User()
    user.password_reset_token = hash
    user.password_reset_expires = now

    const updatedId = await userRepository.update({
      where: { id: userExists.id },
      data: user
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
