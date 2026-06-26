import { User } from '../../database/knex/models'
import { userRepository } from '../../database/repositories'
import { AppError } from '../../shared/utils/errors/app-error'
import { encrypt } from '../../shared/services/encrypt'

type CreateUserInput = {
  name: string
  email: string
  password: string
}

const createUser = async ({ name, email, password }: CreateUserInput): Promise<number | Error> => {
  try {
    const emailAlreadyExists = await userRepository.getByEmail(email)

    if(emailAlreadyExists){
      throw new AppError('Email já cadastrado', 409)
    }

    const user = new User()
    user.name = name
    user.email = email
    user.password_hash = await encrypt.hash(password)

    const newUserId = await userRepository.create(user)

    return newUserId

  } catch (error: any) {
    throw new AppError(error.message, error.statusCode)
  }
}

export { createUser }
