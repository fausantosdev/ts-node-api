import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'
import { jwt } from '../../shared/services/jwt'

type SignInInput = {
  email: string
  password: string
}

const signIn = async ({ email, password }: SignInInput) => {
  try {
    const userExists = await userRepository.getByEmail(email)

    if(!userExists){
      throw new AppError('Falha na autenticação, verifique suas credenciais', 401)
    }

    const passwordCheck = await encrypt.compare(password, userExists.password)

    if(!passwordCheck){
      throw new AppError('Falha na autenticação, verifique suas credenciais', 401)
    }

    const token = jwt.generate({
      id: userExists.id,
      email: userExists.email,
      role: userExists.role
    })

    return token

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { signIn }
