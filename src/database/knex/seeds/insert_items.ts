import { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

export async function seed(knex: Knex): Promise<void> {
  const table = ETableNames.items

  const rows = await knex(table).count<{ count: string }[]>()

  if(rows[0] && Number(rows[0].count) > 0) return

  const user_id = 63

  // Inserts seed entries
  await knex(table).insert([
    { user_id, title: 'Lâmpadas', image: 'lampadas.svg' },
    { user_id, title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { user_id, title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { user_id, title: 'Resíduos Eletronicos', image: 'eletronicos.svg' },
    { user_id, title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { user_id, title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ])
}
