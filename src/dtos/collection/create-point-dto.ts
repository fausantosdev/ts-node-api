import { IPoint } from '../../database/knex/models'

interface CreatePointDTO extends Omit<IPoint,
  'id' |
  'created_at'|
  'updated_at'>{}

export type { CreatePointDTO }
