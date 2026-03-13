import type { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

const table = ETableNames.items

export async function up(knex: Knex): Promise<void> {
    return knex.schema
      .createTable(table, function (table) {
        table.increments('id').primary().index()
        table.integer('user_id').notNullable().references('id').inTable('users')
        table.string('title', 255).notNullable()
        table.string('image', 255).notNullable()
        table.timestamps(true, true)
      })
        .then(()=> console.log(`[✓] table ${table} created`))
        .catch(error => console.log(error.message))
}


export async function down(knex: Knex): Promise<void> {
    return knex
      .schema.dropTable(table)
        .then(()=> console.log(`[✓] table ${table} dropped`))
        .catch(error => console.log(error.message))
}

