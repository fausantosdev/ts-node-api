import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { connection } from '../../src/database/knex/connection'

beforeAll(async () =>{
  await connection.migrate.up()
})

afterAll(async () =>{
  await connection.migrate.down()
  await connection.destroy()
})


describe('Users - create', () => {
  it('Should return 401 if no email is provided', async () => {
    const response = await testServer
      .post('/user')
      .send({
        name: 'Flávio Marques',
        password: 'abcd1234'
      })

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body.errors.body.email).toBe('Campo email é obrigatório')
  })

  it('Should be create a new user', async () => {
    const response = await testServer
      .post('/user')
      .send({
        name: 'Flávio Marques',
        email: 'fausantosdev@gmail.com',
        password: 'abcd1234'
      })

    expect(response.statusCode).toBe(StatusCodes.CREATED)
    expect(response.body.errors).toBe(null)
  })
})
