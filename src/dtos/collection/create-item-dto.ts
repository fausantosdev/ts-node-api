import { IItem } from '../../database/knex/models'

interface CreateItemDTO extends Omit<IItem, 'id' | 'created_at'| 'updated_at'>{}

export type { CreateItemDTO }
