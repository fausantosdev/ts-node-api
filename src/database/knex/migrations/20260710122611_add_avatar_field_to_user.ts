import type { Knex } from 'knex'

import { ETableNames } from '../e-table-names'

const table = ETableNames.users

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(table, table => {
    table.string('avatar').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(table, table => {
    table.dropColumn('avatar')
  })
}
