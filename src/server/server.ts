import express from 'express'
import './../shared/services/yup-translations'

import { routes } from './routes'

const server = express()

server.use(express.json())

routes(server)

export { server }
