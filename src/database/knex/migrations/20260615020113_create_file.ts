import type { Knex } from 'knex'

import { ETableNames } from '../e-table-names'

const table = ETableNames.files

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table, table => {
    table.increments('id').primary()

    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.string('name')
    table.string('mime_type')
    table.integer('size')

    table
      .enu('status', ['attached', 'pending'])
      .notNullable()
      .defaultTo('pending')

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(table)
}
