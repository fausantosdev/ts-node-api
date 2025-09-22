import { connection } from '../../knex/connection'
import { CreateUserDTO } from '../../../dtos/create-user-dto'

const create = async ({ name, email, password }: CreateUserDTO): Promise<number | Error> => {
  try {
    const [ result ] = await connection('users')
      .insert({
        name,
        email,
        password_hash: password
      })
      .returning('id')


    if (!result){
      return new Error('Erro ao criar usuário')
    }

    return result.id

  } catch (error: any) {
    return new Error(error)
  }
}

export { create }
