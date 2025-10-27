import { IItem } from '../../database/knex/models'

interface UpdateItemDTO extends Partial<Omit<IItem,
  'id' |
  'user_id' |
  'created_at' |
  'updated_at'>>{
}

export type { UpdateItemDTO }
