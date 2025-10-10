import supertest from 'supertest'

import { server } from '../src/http/server'

const testServer = supertest(server)

export { testServer }
