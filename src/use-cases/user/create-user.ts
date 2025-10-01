import { userProvider } from '../../database/providers'
import { CreateUserDTO } from '../../dtos/create-user-dto'
import { AppError } from '../../shared/utils/errors/app-error'

const createUser = async ({ name, email, password }: CreateUserDTO): Promise<number | Error> => {
  try {
    const emailAlreadyExists = await userProvider.getByEmail(email)

    if(emailAlreadyExists){
      throw new AppError('Email já cadastrado', 409)
    }

    const newUserId = await userProvider.create({
      name,
      email,
      password
    })

    return newUserId

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { createUser }
