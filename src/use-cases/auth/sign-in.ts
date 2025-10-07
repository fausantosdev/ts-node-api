import { userProvider } from '../../database/providers'
import { SignInDTO } from '../../dtos/sign-in-dto'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'
import { jwt } from '../../shared/services/jwt'

const signIn = async ({ email, password }: SignInDTO): Promise<string | Error> => {
  try {
    const userExists = await userProvider.getByEmail(email)

    if(!userExists){
      throw new AppError('Falha na autenticação, verifique suas credenciais', 401)
    }

    const passwordCheck = await encrypt.compare(password, userExists.password_hash)

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
