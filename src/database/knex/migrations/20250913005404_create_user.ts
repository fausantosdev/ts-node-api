import type { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.users, function (table) {
      table.increments('id').primary().index()
      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password_hash', 255).notNullable()
      table.enum('role', ['user', 'admin']).notNullable().defaultTo('user')
      table.string('password_reset_token', 255).nullable()
      table.dateTime('password_reset_expires').nullable()
      table.timestamps(true, true)
    })
      .then(()=> console.log(`[✓] table ${ETableNames.users} created`))
      .catch(error => console.log(error.message))
}

export async function down(knex: Knex): Promise<void> {
  return knex
    .schema.dropTable(ETableNames.users)
      .then(()=> console.log(`[✓] table ${ETableNames.users} dropped`))
      .catch(error => console.log(error.message))
}
