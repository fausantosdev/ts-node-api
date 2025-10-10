import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
import { connection } from '../../src/database/knex/connection'

const userMock = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: 'abcd1234'
}

let accessToken: ''

beforeAll(async () =>{
  await connection.migrate.up()

  await testServer
    .post('/user')
    .send(userMock)

  const signInResponse = await testServer
    .post('/auth/sign-in')
    .send({
      email: userMock.email,
      password: userMock.password
    })

  accessToken = signInResponse.body.data
})

afterAll(async () =>{
  await connection.migrate.down()
  await connection.destroy()
})

describe('Users - getAll', () => {
  it('Should return 400 if the query\'s \'page\' parameter is different from an integer', async () => {
    const response = await testServer
      .get('/user?page=b')
      .auth(accessToken, { type: 'bearer' })

    console.log(response.body)

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body.errors.query.page).toEqual('Formato digitado é invalido')
  })
})
