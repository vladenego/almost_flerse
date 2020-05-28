import { createServer } from './server'

// create and start server
createServer().then((server) => {
  server.listen(8080, () => {
    console.log('listening on 8080')
  })
})
