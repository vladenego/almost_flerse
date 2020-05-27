import { createServer } from './server'
// import './global.d.ts'

// create and start server
createServer().then((server) => {
  server.listen(8080, () => {
    console.log('listening on 8080')
  })
})
