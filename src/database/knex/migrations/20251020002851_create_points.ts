import type { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

const table = ETableNames.points

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(table, function (table) {
      table.increments('id').primary().index()
      table.integer('user_id').notNullable().references('id').inTable('users')
      table.string('image', 255).notNullable()
      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('whatsapp', 255).notNullable()
      table.decimal('latitude').notNullable()
      table.decimal('longitude').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()
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

