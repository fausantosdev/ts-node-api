import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Users - getAll', () => {
  it('Should return 400 if the query\'s \'page\' parameter is different from an integer', async () => {
    const response = await testServer
      .get('/user?page=b')

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body.errors.query.page).toEqual('Formato digitado é invalido')
  })
})
