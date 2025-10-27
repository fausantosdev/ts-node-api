import { IPoint } from '../../database/knex/models'

interface UpdatePointDTO extends Partial<Omit<IPoint,
  'id' |
  'user_id' |
  'created_at' |
  'updated_at'>>{}

export type { UpdatePointDTO }
