import 'dotenv/config'

import { server } from './server/server'

server.listen(process.env.PORT || 3333, () => {
  console.log('~ server is running')
})
