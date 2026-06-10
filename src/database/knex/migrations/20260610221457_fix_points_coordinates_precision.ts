import type { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

const table = ETableNames.points

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE ${table}
    ALTER COLUMN latitude TYPE DOUBLE PRECISION,
    ALTER COLUMN longitude TYPE DOUBLE PRECISION;
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE ${table}
    ALTER COLUMN latitude TYPE NUMERIC,
    ALTER COLUMN longitude TYPE NUMERIC;
  `)
}
