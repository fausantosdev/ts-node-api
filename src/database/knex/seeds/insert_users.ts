import { Knex } from 'knex'
import { ETableNames } from '../e-table-names'

export async function seed(knex: Knex): Promise<void> {
  const rows = await knex('users').count<{ count: string }[]>()

  if(rows[0] && Number(rows[0].count) > 0) return

  // Inserts seed entries
  await knex(ETableNames.users).insert([
    { name: 'John Doe', email: 'johndoe@mail.com', password_hash: '123456' },
    { name: 'Jane Smith', email: 'janesmith@mail.com', password_hash: '123456' },
    { name: 'Alice Johnson', email: 'alicejohnson@mail.com', password_hash: '123456' },
    { name: 'Bob Williams', email: 'bobwilliams@mail.com', password_hash: '123456' },
    { name: 'Charlie Brown', email: 'charliebrown@mail.com', password_hash: '123456' },
    { name: 'Diana Prince', email: 'dianaprince@mail.com', password_hash: '123456' },
    { name: 'Ethan Hunt', email: 'ethanhunt@mail.com', password_hash: '123456' },
    { name: 'Fiona Davis', email: 'fionadavis@mail.com', password_hash: '123456' },
    { name: 'George Miller', email: 'georgemiller@mail.com', password_hash: '123456' },
    { name: 'Hannah Scott', email: 'hannahscott@mail.com', password_hash: '123456' },
    { name: 'Ian Clark', email: 'ianclark@mail.com', password_hash: '123456' },
    { name: 'Julia Adams', email: 'juliaadams@mail.com', password_hash: '123456' },
    { name: 'Kevin Lee', email: 'kevinlee@mail.com', password_hash: '123456' },
    { name: 'Laura Moore', email: 'lauramoore@mail.com', password_hash: '123456' },
    { name: 'Michael Young', email: 'michaelyoung@mail.com', password_hash: '123456' },
    { name: 'Natalie White', email: 'nataliewhite@mail.com', password_hash: '123456' },
    { name: 'Oscar King', email: 'oscarking@mail.com', password_hash: '123456' },
    { name: 'Paula Green', email: 'paulagreen@mail.com', password_hash: '123456' },
    { name: 'Quentin Brooks', email: 'quentinbrooks@mail.com', password_hash: '123456' },
    { name: 'Rachel Evans', email: 'rachelevans@mail.com', password_hash: '123456' },
    { name: 'Samuel Turner', email: 'samuelturner@mail.com', password_hash: '123456' },
    { name: 'Tina Perez', email: 'tinaperez@mail.com', password_hash: '123456' },
    { name: 'Ulysses Price', email: 'ulyssesprice@mail.com', password_hash: '123456' },
    { name: 'Victoria Barnes', email: 'victoriabarnes@mail.com', password_hash: '123456' },
    { name: 'William Reed', email: 'williamreed@mail.com', password_hash: '123456' },
    { name: 'Xavier Ross', email: 'xavierross@mail.com', password_hash: '123456' },
    { name: 'Yvonne Cooper', email: 'yvonnecooper@mail.com', password_hash: '123456' }
  ])
}
