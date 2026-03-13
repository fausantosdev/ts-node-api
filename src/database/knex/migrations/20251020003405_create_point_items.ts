import type { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

const table = ETableNames.point_items

export async function up(knex: Knex): Promise<void> {
    return knex.schema
      .createTable(table, function (table) {
        table.increments('id').primary().index()
        table.integer('point_id').notNullable().references('id').inTable('points')
        table.integer('item_id').notNullable().references('id').inTable('items')
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

