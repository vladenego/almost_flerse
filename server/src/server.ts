import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import { createDatabase } from './database'
import { loginHandler } from './handlers/auth/login'
import { registerHandler } from './handlers/auth/register'
import { createPostHandler } from './handlers/posts/create-post'
import { listPostsHandler } from './handlers/posts/list-posts'
import { getPostHandler } from './handlers/posts/get-post'
import { updatePostHandler } from './handlers/posts/update-post'
import { deletePostHandler } from './handlers/posts/delete-post'

/** creates a new express server */
export const createServer = async () => {
  // create express application
  const server = express()

  // connect to database
  console.log('connecting to database')
  const database = await createDatabase()

  // set up middlewares
  console.log('setting up middlewares')
  server.use(morgan('tiny'))
  server.use(bodyParser.json({ limit: '4mb' }))

  // set up routes
  console.log('setting up routes')
  // auth
  server.post('/auth/login', loginHandler(database))
  server.post('/auth/register', registerHandler(database))
  // posts
  server.post('/posts', createPostHandler(database))
  server.get('/posts', listPostsHandler(database))
  server.get('/posts/:postId', getPostHandler(database))
  server.patch('/posts/:postId', updatePostHandler(database))
  server.delete('/posts/:postId', deletePostHandler(database))

  return server
}
