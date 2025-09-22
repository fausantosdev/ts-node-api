import { IUser } from '../database/knex/models'

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

export type { CreateUserDTO }
