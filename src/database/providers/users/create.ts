import { connection } from '../../knex/connection'
import { IUser } from '../../knex/models'

interface CreateUserDTO extends Omit<IUser,
  'id' |
  'password_hash' |
  'role' |
  'password_reset_token' |
  'password_reset_expires' |
  'created_at'|
  'updated_at'>{
  password: string
}

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
