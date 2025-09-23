import { IUser } from '../database/knex/models'

interface UpdateUserDTO extends Partial<Omit<IUser,
  'id' |
  'password_hash' |
  'created_at' |
  'updated_at'>>{
  password?: string | undefined
}

export type { UpdateUserDTO }
