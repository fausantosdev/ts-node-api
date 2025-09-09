import supertest from 'supertest'

import { server } from '../src/server/server'

const testServer = supertest(server)

export { testServer }
